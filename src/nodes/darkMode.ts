import path from 'path';
import { Element } from 'hast';
import { getSVGNode } from '../utils/getSVGNode.js';
import { Option as InitOption } from './search.js';
import { pkg } from '../utils/utils.js';

interface Option extends InitOption {
  githubURL?: string;
}

export function darkMode({ homePath = '', isHome, static_path }: Option = {}): Element[] {
  const relativePath = homePath.replace(/[\\/]?index.html$/, isHome ? '' : '/');
  const iconSunPath = path.resolve(static_path, `assets/sun.svg`);
  const iconMoonPath = path.resolve(static_path, `assets/moon.svg`);
  const sunNode = getSVGNode(iconSunPath);
  const moonNode = getSVGNode(iconMoonPath);
  const darkJSUrl = relativePath + 'js/dark.js' + `?v=${pkg.version}`;
  return [
    {
      type: 'element',
      tagName: 'button',
      properties: {
        id: 'darkMode',
        type: 'button',
      },
      children: [...sunNode, ...moonNode],
    },
    {
      type: 'element',
      tagName: 'script',
      properties: {
        src: darkJSUrl,
      },
      children: []
    },
  ];
}
