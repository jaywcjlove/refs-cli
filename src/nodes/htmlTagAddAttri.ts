import { Option } from './search.js';
import { Element } from 'hast';

export function htmlTagAddAttri(node: Element, { isHome }: Option) {
  if (node && node.tagName === 'html') {
    node.properties['data-color-mode'] = 'dark';
  }
  if (node && node.tagName === 'body' && isHome) {
    node.properties.class = ['home'];
  }
}
