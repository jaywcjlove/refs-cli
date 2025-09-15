import { Root, RootContent } from 'hast';

export function rehypeUrls(node: Root | RootContent) {
  if (
    node.type === 'element' &&
    node.properties?.href &&
    /.md/.test(node.properties.href as string) &&
    !/^(https?:\/\/)/.test(node.properties.href as string)
  ) {
    let href = node.properties.href as string;
    node.properties.href = href
      .replace(/\/README.(md|markdown)$/gi, '/index.html')
      .replace(/([^\.\/\\]+)\.(md|markdown)/gi, '$1.html');
  }
}
