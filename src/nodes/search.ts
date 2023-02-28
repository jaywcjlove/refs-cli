import path from 'path';
import { Element } from 'hast';
import { getSVGNode } from '../utils/getSVGNode.js';
import { Options as RunOptions, pkg } from '../utils/utils.js';

export interface Option extends Partial<RunOptions> {
  isHome?: boolean;
  homePath?: string;
}

export function search({ homePath = '', isHome, static_path, config }: Option = {}): Element[] {
  const relativePath = homePath.replace(/\/?index.html$/, isHome ? '' : '/');
  const fuseJSUrl = relativePath + 'js/fuse.min.js' + `?v=${pkg.version}`;
  const manJSUrl = relativePath + 'js/main.js' + `?v=${pkg.version}`;
  const dataJSUrl = relativePath + 'data.js' + `?v=${pkg.version}`;
  const ICONS_SEARCH_PATH = path.resolve(static_path, 'assets/search.svg');
  const svgSearchNode = getSVGNode(ICONS_SEARCH_PATH);
  return [
    {
      type: 'element',
      tagName: 'script',
      properties: {
        src: dataJSUrl,
        defer: true,
      },
      children: []
    },
    {
      type: 'element',
      tagName: 'script',
      properties: {
        src: fuseJSUrl,
        defer: true,
      },
      children: []
    },
    {
      type: 'element',
      tagName: 'script',
      properties: {
        src: manJSUrl,
        defer: true,
      },
      children: []
    },
    {
      type: 'element',
      tagName: 'div',
      properties: {
        id: 'mysearch',
      },
      children: [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            class: ['mysearch-box'],
          },
          children: [
            {
              type: 'element',
              tagName: 'div',
              properties: { class: ['mysearch-input'] },
              children: [
                {
                  type: 'element',
                  tagName: 'div',
                  properties: {},
                  children: [
                    ...svgSearchNode,
                    {
                      type: 'element',
                      tagName: 'input',
                      properties: {
                        id: ['mysearch-input'],
                        type: 'search',
                        placeholder: config.search?.label || 'Search for cheatsheet',
                        autocomplete: 'off',
                      },
                      children: []
                    },
                    {
                      type: 'element',
                      tagName: 'div',
                      properties: { class: ['mysearch-clear'] },
                      children: []
                    },
                  ],
                },
                {
                  type: 'element',
                  tagName: 'button',
                  properties: { id: ['mysearch-close'], type: 'button' },
                  children: [{ type: 'text', value: config.search?.label || 'Cancel' }],
                },
              ],
            },
            {
              type: 'element',
              tagName: 'div',
              properties: { class: ['mysearch-result'] },
              children: [
                {
                  type: 'element',
                  tagName: 'div',
                  properties: { id: 'mysearch-menu' },
                  children: []
                },
                {
                  type: 'element',
                  tagName: 'div',
                  properties: { id: 'mysearch-content' },
                  children: []
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
