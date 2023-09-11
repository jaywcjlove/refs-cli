import { type Options } from '../utils/utils.js';
import { Element } from 'hast';

export const giscus = (options: Options): Element[] => {
  if (!options.config.giscus) return [];
  return [
    {
      type: 'element',
      tagName: 'script',
      properties: {
        ...options.config.giscus,
      },
      children: [],
    },
    {
      type: 'element',
      tagName: 'div',
      properties: {
        class: 'giscus',
      },
      children: [],
    },
  ];
};
