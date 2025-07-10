import { Element } from 'hast';

let scriptString = (analyticsId?: string) => `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${analyticsId}');`;

export const googleAnalytics = (analyticsId?: string): Element[] => {
  if (!analyticsId) return [];
  return [
    {
      type: 'element',
      tagName: 'script',
      properties: {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`,
      },
      children: [],
    },
    {
      type: 'element',
      tagName: 'script',
      properties: {},
      children: [
        {
          type: 'text',
          value: scriptString(analyticsId),
        },
      ],
    },
  ];
};
