import { Element, ElementContent } from 'hast';

interface Result extends Element {
  number?: number;
}

/** 标记 Number */
export function panelAddNumber(arr: (Element | ElementContent)[] = [], result: Result[] = []) {
  let n = 0;
  let level = -1;
  while (n < arr.length) {
    const toc = arr[n];
    const titleNum = toc?.type === 'element' ? Number(toc?.tagName?.replace(/^h/, '')) : null;
    if (titleNum && titleNum > -1) {
      level = titleNum;
    }
    if (toc) {
      result.push({ ...toc, number: level } as Result);
    }
    n++;
  }
  return result;
}
