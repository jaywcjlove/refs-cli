import fs from 'fs-extra';
import path from 'path';
import { Root, Element, RootContent } from 'hast';
import { getCodeString } from 'rehype-rewrite';
import { getSVGNode, ICONS_PATH } from './getSVGNode.js';
import { DetailData } from './create.js';
import { Options as RunOptions } from '../utils/utils.js';

const resultHomeCard: Record<string, DetailData> = {};
const COLOR_REG = /background:(\s+)?rgb\(([\d]+\s+[\d]+\s+[\d]+(\s+)?)\);?/gi;

export function homeCardIcons(
  node: Root | RootContent,
  parent: Root | Element,
  { isHome, static_path, config }: RunOptions,
) {
  const properties = node.type === 'element' ? node.properties : {};
  const className =
    node.type === 'element' && properties
      ? typeof properties.class === 'string'
        ? properties.class.split(' ')
        : [properties.class].flat()
      : [];
  if (isHome && node && node.type === 'element' && className.includes('contributing')) {
    node.properties['data-info'] = node.properties['data-info'] || config['data-info'] || '👆need your participation';
  }
  if (isHome && node && node.type === 'element' && className.includes('home-card')) {
    node.children = node.children.map((child) => {
      const href = (child.type === 'element' ? child.properties?.href : '') as string;
      if (href && (href.endsWith('.md') || /^https?:\/\//.test(href)) && child.type === 'element') {
        const iconName = path.basename(href, '.md');
        const iconPath = path.resolve(ICONS_PATH, `${iconName}.svg`);
        const iconDefaultPath = path.resolve(static_path, `assets/list.svg`);
        const iconNetworkDefaultPath = path.resolve(static_path, `assets/network.svg`);
        const iconExist = fs.existsSync(iconPath);
        let color = '';
        child.properties.style = (child.properties.style as string)?.replace(COLOR_REG, (str) => {
          color = str.replace(COLOR_REG, '$2');
          return str.replace(/(\);)/, '/ var(--bg-opacity)$1');
        });
        const tags = child.properties['data-lang'] as string;
        const labelNode: Element = {
          type: 'element',
          tagName: 'span',
          children: child.children,
        };
        const title = getCodeString(child.children);
        if (iconExist) {
          const svgNode = getSVGNode(iconPath);
          child.children = [...svgNode, labelNode];
        } else if (/^https?:\/\//.test(href)) {
          const svgNode = getSVGNode(iconNetworkDefaultPath);
          child.children = [...svgNode, labelNode];
        } else {
          const svgNode = getSVGNode(iconDefaultPath);
          child.children = [...svgNode, labelNode];
        }
        resultHomeCard[iconName] = {
          md: iconName,
          title: title,
          rgb: color,
          tags: tags ? tags.split('/') : [],
        };
      }
      return child;
    });
  }
  return resultHomeCard;
}
