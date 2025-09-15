import fs from 'fs-extra';
import path from 'path';
import type { Root, RootContent } from 'hast';
import * as log from './log.js';
import { Options } from './create.js';

export function copyied(fromPath: string, toPath: string) {
  if (fs.existsSync(fromPath) === false) {
    log.error('\x1b[31;1mcopy failed\x1b[0m')(decodeURIComponent(fromPath), decodeURIComponent(toPath));
    return;
  }
  const stat = fs.statSync(fromPath);
  if (!stat.isFile()) {
    return;
  }
  fs.ensureDir(path.dirname(toPath), (err) => {
    if (err) {
      log.log(` \x1b[31midoc:copy:\x1b[0m`)(`create dir failed: ${path.dirname(toPath)}`);
      return;
    }
    fs.copyFile(decodeURIComponent(fromPath), decodeURIComponent(toPath))
      .then((result) => {
        log.output('\x1b[35;1mcopy\x1b[0m')(decodeURIComponent(fromPath), decodeURIComponent(toPath));
      })
      .catch((err) => {
        console.log(` \x1b[31midoc:asset:copy:\x1b[0m`, err);
      });
  });
}

export function copyAsset(node: Root | RootContent, options: Options = {}) {
  let mdpath = options.fromPath || '';

  if (node.type !== 'element' || !/^(img|a|video|source|audio)$/.test(node.tagName)) return;
  let src = node.properties.src as string;
  if (typeof src !== 'string' || /^https?:\/\//.test(src) || !src || /^data:/.test(src)) return;
  let outputHTMLPath = options.outputHTMLPath || '';
  const assetFromPath = path.resolve(path.dirname(mdpath), decodeURIComponent(src)).replace(/[?#].*$/, '');
  const assetToPath = path.resolve(path.dirname(outputHTMLPath), decodeURIComponent(src)).replace(/[?#].*$/, '');
  copyied(assetFromPath, assetToPath);
}
