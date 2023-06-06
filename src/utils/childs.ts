import { Element } from 'hast';

export function getChilds(data: Element[] = [], level: number, result: Element[] = []) {
  for (let i = 1; i <= data.length; i++) {
    const titleNum = Number(data[i]?.tagName?.replace(/^h/, ''));
    if (titleNum && titleNum === level) break;
    result.push(data[i]);
  }
  return result;
}

interface Data extends Element {
  number?: number;
}
/** 获取 Heading 到下一个 Heading 之间的内容*/
export function getHeader(data: Data[] = [], level: number, result: Data[] = []) {
  for (let i = 1; i <= data.length; i++) {
    if (/^h\d$/.test(data[i]?.tagName) || data[i]?.number !== level) break;
    result.push(data[i]);
  }
  return result;
}
