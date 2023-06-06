import path from 'path';
import { getCodeString } from 'rehype-rewrite';
import { Element, ElementContent } from 'hast';
import { panelAddNumber } from './panelAddNumber.js';
import { getChilds, getHeader } from './childs.js';
import { getSVGNode } from './getSVGNode.js';
import { Options } from './utils.js';

export const titleNum = (tagName = '') => Number(tagName.replace(/^h/, ''));

export function getTocsTitleNode(arr: (Element | ElementContent)[] = [], result: (Element & ElementContent)[] = []) {
  arr.forEach(({ tagName, type, properties, children }: Element) => {
    if (/^h[23456]/.test(tagName)) {
      const num = titleNum(tagName);
      const props = {
        'aria-hidden': 'true',
        class: `leve${num} tocs-link`,
        'data-num': num,
        href: '#' + (properties.id || ''),
      };
      const title = getCodeString(children || []);
      result.push({ tagName: 'a', type, properties: props, children: [{ type: 'text', value: title || ' ' }] });
    } else if (children?.length > 0) {
      result = result.concat(getTocsTitleNode(children));
    }
  });
  return result;
}

export function addTocsInWarp(tocsData = [], menuData, isDone = false) {
  const childs = tocsData.map((item) => {
    if (item.properties?.class?.includes('h1wrap-body')) {
      isDone = true;
    }
    if (!isDone && item.children) {
      item.children = addTocsInWarp([...item.children], menuData, isDone);
    }
    return item;
  });
  if (isDone) {
    childs.splice(1, 0, menuData);
  }
  return childs;
}

export const getTocsTitleNodeWarpper = (children: ElementContent[] = [], options: Options): Element => {
  const iconPath = path.resolve(options.static_path, `assets/menu.svg`);
  const svgNode = getSVGNode(iconPath);
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      class: 'menu-tocs',
    },
    children: [
      {
        type: 'element',
        tagName: 'div',
        properties: {
          class: 'menu-btn',
        },
        children: [...svgNode],
      },
      {
        type: 'element',
        tagName: 'div',
        properties: {
          class: 'menu-modal',
        },
        children: children,
      },
    ],
  };
};

/** Markdown 文档转成树形结构 */
export function getTocsTree(arr: (Element | ElementContent)[] = [], result: Element[] = []): Element[] {
  const data = panelAddNumber(arr);

  let n = 0;
  let level = -1;

  while (n < data.length) {
    const toc = data[n];

    if (level === -1) {
      level = toc.number;
    }
    if (toc.number === level && titleNum(toc.tagName) === level) {
      const header = getHeader(data.slice(n), level);
      const childs = getChilds([...data.slice(n + 1)], level);
      const resultChilds = getTocsTree(childs);
      const wrapCls = ['wrap'];
      const headerCls = ['wrap-header', `h${level}wrap`];
      wrapCls.push(`h${level}body-${resultChilds.length === 0 ? 'not-' : ''}exist`);

      if (level === 1) wrapCls.push('max-container');
      const wrapStyle = toc.properties['wrap-style'];
      delete toc.properties['wrap-style'];
      const wrapClass = toc.properties['wrap-class'] as string;
      if (wrapClass) wrapCls.push(wrapClass);
      delete toc.properties['wrap-class'];
      const bodyStyle = toc.properties['body-style'];
      let panle: Element | Element[] = {
        type: 'element',
        tagName: 'div',
        properties: { class: wrapCls, style: wrapStyle },
        children: [
          {
            type: 'element',
            tagName: level === 1 ? 'header' : 'div',
            properties: { class: headerCls },
            children: [
              toc,
              {
                type: 'element',
                tagName: 'div',
                properties: { style: bodyStyle, class: ['wrap-body'] },
                children: [...header],
              },
            ],
          },
        ],
      };
      if (titleNum(toc.tagName) > 3) {
        panle = [toc, ...header];
      }
      if (resultChilds.length > -1) {
        const bodyStyle = toc.properties['body-style'];
        const bodyClass = toc.properties['body-class'] as string;
        delete toc.properties['body-style'];
        delete toc.properties['body-class'];
        delete toc.properties['wrap-style'];
        delete toc.properties['wrap-class'];
        if (Array.isArray(panle)) {
          panle = panle.concat(resultChilds);
        } else if (panle.children) {
          if (titleNum(toc.tagName) < 3) {
            panle.children = panle.children.concat({
              type: 'element',
              tagName: 'div',
              properties: { style: bodyStyle, class: [`h${level}wrap-body`, bodyClass] },
              children: [...resultChilds],
            });
          } else if (
            panle.children[0] &&
            panle.children[0].type === 'element' &&
            panle.children[0].children[1] &&
            panle.children[0].children[1].type === 'element'
          ) {
            if (Array.isArray(panle.children[0].children[1].properties?.class)) {
              panle.children[0].children[1].properties?.class.push(bodyClass);
            }
            panle.children[0].children[1].children = panle.children[0].children[1].children.concat(resultChilds);
            if (panle.children[0].children[1].properties && bodyStyle) {
              const initStyle = (panle.children[0].children[1].properties?.style || '') as string;
              panle.children[0].children[1].properties.style = initStyle + bodyStyle;
            }
          }
        }
      }
      if (Array.isArray(panle)) {
        result = result.concat(panle);
      } else {
        result.push(panle);
      }
    }

    n++;
  }
  return result;
}
