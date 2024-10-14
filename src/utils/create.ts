import markdown, { Options as MarkdownOptions } from '@wcj/markdown-to-html';
import rehypeDocument from 'rehype-document';
import remarkGemoji from 'remark-gemoji';
import rehypeRaw from 'rehype-raw';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getCodeString } from 'rehype-rewrite';
import rehypeSlug from 'rehype-slug';
import { htmlTagAddAttri } from '../nodes/htmlTagAddAttri.js';
import { footer } from '../nodes/footer.js';
import { search } from '../nodes/search.js';
import { header } from '../nodes/header.js';
import { giscus } from '../nodes/giscus.js';
import { rehypeUrls } from './rehypeUrls.js';
import { tooltips } from './tooltips.js';
import { homeCardIcons } from './homeCardIcons.js';
import { getTocsTree, getTocsTitleNode, getTocsTitleNodeWarpper, addTocsInWarp } from './getTocsTree.js';
import { rehypeTitle } from './rehypeTitle.js';
import { rehypePreviewHTML } from './rehypePreviewHTML.js';
import { Options as RunOtions, getRelativePath } from './utils.js';

const favicon = `data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%221em%22%20width%3D%221em%22%3E%20%3Cpath%20d%3D%22m21.66%2010.44-.98%204.18c-.84%203.61-2.5%205.07-5.62%204.77-.5-.04-1.04-.13-1.62-.27l-1.68-.4c-4.17-.99-5.46-3.05-4.48-7.23l.98-4.19c.2-.85.44-1.59.74-2.2%201.17-2.42%203.16-3.07%206.5-2.28l1.67.39c4.19.98%205.47%203.05%204.49%207.23Z%22%20fill%3D%22%23c9d1d9%22%2F%3E%20%3Cpath%20d%3D%22M15.06%2019.39c-.62.42-1.4.77-2.35%201.08l-1.58.52c-3.97%201.28-6.06.21-7.35-3.76L2.5%2013.28c-1.28-3.97-.22-6.07%203.75-7.35l1.58-.52c.41-.13.8-.24%201.17-.31-.3.61-.54%201.35-.74%202.2l-.98%204.19c-.98%204.18.31%206.24%204.48%207.23l1.68.4c.58.14%201.12.23%201.62.27Zm2.43-8.88c-.06%200-.12-.01-.19-.02l-4.85-1.23a.75.75%200%200%201%20.37-1.45l4.85%201.23a.748.748%200%200%201-.18%201.47Z%22%20fill%3D%22%23228e6c%22%20%2F%3E%20%3Cpath%20d%3D%22M14.56%2013.89c-.06%200-.12-.01-.19-.02l-2.91-.74a.75.75%200%200%201%20.37-1.45l2.91.74c.4.1.64.51.54.91-.08.34-.38.56-.72.56Z%22%20fill%3D%22%23228e6c%22%20%2F%3E%20%3C%2Fsvg%3E`;

export interface Options extends Partial<RunOtions> {
  isHome?: boolean;
  filename?: string;
  css?: string[];
}

export interface DetailData {
  title?: string;
  path?: string;
  intro?: string;
  icon?: string;
  name?: string;
  rgb?: string;
  md?: string;
  tags?: string[];
  sections?: Array<{
    a: string;
    t: string;
    l: number;
  }>;
}

export function create(str = '', options: Options = {}) {
  let title = (str.match(/[^===]+(?=[===])/g) || [])[0] || '';
  let description = str
    .replace(/<!--rehype:ignore:start-->([\s\S]*?)?<!--rehype:ignore:end-->/gi, '')
    .replace(/##([\s\S]*)/g, '')
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/[\w\s]+---([\s\S]*)/gi, '')
    .replace(/\[([\s\S]*?)?\]\(([\s\S]*?)?\)/g, '$1')
    .replace(/[\D]+==+[\n]+/g, '')
    .replace(/\n+$/g, '')
    .replace(/[`_\*]/g, '')
    .replace(/!\[([\s\S]*?)\]\(([\s\S]*?)\)\s+/g, '');
  description = (options.config.description || description).replace(/\{\{description\}\}/gi, description);
  const keywords = `${!options.isHome ? options.filename + ',' : ''}${options.config?.keywords || ''}`;

  const subTitle = options.filename && !options.isHome ? `${options.filename} cheatsheet & ` : '';
  const metaData = Array(...(options.config?.meta || [])).map((item) => {
    const newItem = { ...item };
    if (newItem.href) {
      newItem.href = getRelativePath(newItem.href);
    }
    return newItem;
  });
  /** 用于搜索数据 */
  const detailData: DetailData = {
    title: title.replace(/\n/g, ''),
    path: '',
    intro: description,
    icon: '',
    sections: [],
  };

  const faviconIcon = getRelativePath(options.config?.favicon || favicon);
  const mdOptions: MarkdownOptions = {
    showLineNumbers: false,
    hastNode: false,
    katexOptions: {
      strict: false,
    },
    remarkPlugins: [remarkGemoji],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [
        rehypeDocument,
        {
          title: `${title ? `${title} & ` : ''} ${subTitle} ${options.config?.title || 'Quick Reference'}`,
          css: [...options.css],
          link: [{ rel: 'icon', href: faviconIcon, type: 'image/svg+xml' }],
          meta: [{ description: description }, { keywords: keywords }, ...metaData],
        },
      ],
    ],
    filterPlugins: (type, plugins = []) => {
      if (type === 'rehype') {
        let rehypePrism = null;
        const dt = plugins.filter((plug) => {
          if (Array.isArray(plug) && /(rehypePrism)/.test(plug[0].name)) {
            rehypePrism = plug;
          }
          return /(rehypeRaw|rehypePrism)/.test((plug as any).name) ? false : true;
        });
        // 放在 rehypeDocument 前面
        dt.unshift(rehypeRaw);
        if (rehypePrism) {
          dt.unshift(rehypePrism);
        }
        dt.unshift(rehypePreviewHTML);
        return dt;
      }
      return plugins;
    },
    rewrite: (node, index, parent) => {
      const iconName = rehypeTitle(node, options);
      if (iconName) {
        detailData.icon = iconName;
      }
      const resultHomeCard = homeCardIcons(node, parent, options);
      if (options.filename && resultHomeCard[options.filename]) {
        detailData.rgb = resultHomeCard[options.filename].rgb;
        detailData.name = resultHomeCard[options.filename].title;
        if (resultHomeCard[options.filename].tags) {
          detailData.tags = resultHomeCard[options.filename].tags;
        }
      }
      tooltips(node, index, parent);
      if (node.type === 'element') {
        htmlTagAddAttri(node, options);
      }
      rehypeUrls(node);
      if (node.type === 'element' && node.children) {
        if (node.type === 'element' && node.tagName === 'body') {
          const tocsData = getTocsTree([...node.children]);
          if (!options.isHome) {
            const tocsMenus = getTocsTitleNode([...tocsData]);
            node.children = addTocsInWarp(
              [...tocsData],
              giscus(options),
              getTocsTitleNodeWarpper([...tocsMenus], options),
            );
            // 生成搜索数据
            tocsMenus.forEach((menu, idx) => {
              const level = menu?.properties['data-num'];
              if (idx + 1 === tocsMenus.length && level === 2) {
                return;
              }
              if (typeof level === 'number' && level < 4) {
                detailData.sections.push({
                  a: menu?.properties?.href as string,
                  t: getCodeString(menu.children),
                  l: menu?.properties['data-num'] as number,
                });
              }
            });
          } else {
            node.children = tocsData;
          }
          node.children.unshift(header(options));
          node.children.push(footer(options));
          node.children = node.children.concat(search(options));
        }
      }
    },
  };
  const htmlStr = markdown(str, mdOptions);
  return { html: htmlStr, data: detailData };
}
