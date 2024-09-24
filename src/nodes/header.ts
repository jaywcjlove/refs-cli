import path from 'path';
import * as dotenv from 'dotenv';
import { github, editor, home } from './logo.js';
import { getSVGNode } from '../utils/getSVGNode.js';
import { darkMode } from './darkMode.js';
import { Option as InitOption } from './search.js';
import { Element, ElementContent } from 'hast';

dotenv.config();

interface Option extends InitOption {
  githubURL?: string;
}

export function getReferrals(options: Option = {}): MenuData[] {
  const url = process.env.REF_URL || options.config?.home?.url;
  const label = process.env.REF_LABEL || options.config?.home?.label;
  if (!url || !label) return [];
  return [
    {
      menu: true,
      href: url,
      target: '__blank',
      label: label,
      children: [home],
    },
  ];
}

type MenuData = {
  menu?: boolean;
  href?: string;
  target?: string;
  label?: string;
  class?: string[];
  id?: string;
  children?: (Element | ElementContent)[];
};

export function header(options: Option = {}): Element {
  const ICONS_PATH = path.resolve(options.static_path, './assets/quickreference.svg');
  const ICONS_SEARCH_PATH = path.resolve(options.static_path, './assets/search.svg');
  const svgNode = getSVGNode(ICONS_PATH);
  const svgSearchNode = getSVGNode(ICONS_SEARCH_PATH);
  const githubEditButton = options.githubURL
    ? [
        {
          menu: true,
          href: options.githubURL,
          target: '__blank',
          label: options.config.editor?.label || 'Edit',
          children: [editor],
        },
      ]
    : [];
  const data: MenuData[] = [
    {
      menu: true,
      href: 'javascript:void(0);',
      class: ['searchbtn'],
      id: 'searchbtn',
      children: [
        ...svgSearchNode,
        {
          type: 'element',
          tagName: 'span',
          properties: {},
          children: [
            {
              type: 'text',
              value: options.config.search?.label || 'Search',
            },
          ],
        },
        {
          type: 'element',
          tagName: 'span',
          properties: {},
          children: [
            {
              type: 'text',
              value: '⌘',
            },
            {
              type: 'text',
              value: 'K',
            },
          ],
        },
      ],
    },
    ...getReferrals(options),
    ...githubEditButton,
    ...darkMode(options),
  ];
  if (options.config?.github?.url) {
    data.push({
      menu: true,
      href: options.config?.github?.url,
      target: '__blank',
      children: [github],
    });
  }
  return {
    type: 'element',
    tagName: 'nav',
    properties: {
      class: 'header-nav',
    },
    children: [
      {
        type: 'element',
        tagName: 'div',
        properties: {
          class: ['max-container'],
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: options.homePath,
              class: ['logo'],
            },
            children: [
              ...svgNode,
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  class: ['title'],
                },
                children: [{ type: 'text', value: options.config?.title || 'Quick Reference' }],
              },
            ],
          },
          {
            type: 'element',
            tagName: 'div',
            properties: {
              class: ['menu'],
            },
            children: data.map(({ href, label, menu, children = [], ...props }) => {
              if (!menu) return { children, ...props };
              const childs = {
                type: 'element',
                tagName: 'a',
                properties: { href, class: [], ...props },
                children: [
                  ...children,
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {},
                    children: label ? [{ type: 'text', value: label }] : [],
                  },
                ],
              };
              if (label) {
                childs.children = [
                  ...children,
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {},
                    children: [{ type: 'text', value: label }],
                  },
                ];
              } else {
                childs.children = children;
              }
              return childs;
            }) as ElementContent[],
          },
        ],
      },
    ],
  };
}
