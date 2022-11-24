import fs from 'fs-extra';
import path from 'path';
import { getSVGNode, ICONS_PATH } from './getSVGNode.js';
import { Root, RootContent } from 'hast';
import { Options } from './utils.js';

export function rehypeTitle(node: Root | RootContent, { filename = '', static_path }: Options = {}) {
  if (node.type === 'element' && node.tagName === 'h1' && filename !== 'index') {
    const iconPath = path.resolve(ICONS_PATH, `${filename}.svg`);
    console.log('iconPath:', iconPath)
    const iconDefaultPath = path.resolve(static_path, `assets/list.svg`);
    const iconExist = fs.existsSync(iconPath);
    if (iconExist) {
      const svgNode = getSVGNode(iconPath);
      node.children = [...svgNode, ...node.children];
      // 如果存在返回图标名称
      return filename;
    } else {
      const svgNode = getSVGNode(iconDefaultPath);
      node.children = [...svgNode, ...node.children];
    }
  }
}
