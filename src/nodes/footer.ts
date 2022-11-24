import formatter from '@uiw/formatter';
import { Element } from 'hast';
import { Option as InitOption } from './search.js';

export function footer({ isHome }: InitOption = {}): Element {
  let footerText = '© 2022 Kenny Wang.';
  if (isHome) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const cst = new Date(utc + 3600000 * 8);
    footerText += ` Updated on ${formatter('YYYY/MM/DD HH:mm:ss', cst)}`;
  }
  return {
    type: 'element',
    tagName: 'footer',
    properties: {
      class: 'footer-wrap',
    },
    children: [
      {
        type: 'element',
        tagName: 'footer',
        properties: {
          class: ['max-container'],
        },
        children: [{ type: 'text', value: footerText }],
      },
    ],
  };
}
