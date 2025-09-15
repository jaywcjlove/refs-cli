import path from 'node:path';
import chokidar from 'chokidar';
import { getStat } from 'recursive-readdir-files';
import { Options, DOCS, run, createHTML, copyCSSFile, copyJSFile, copyAttachments, __filename } from './utils/utils.js';

export default async function watch(options: Options) {
  await run(options);
  const homeMdPath = path.resolve(process.cwd(), 'README.md');
  const cssDirPath = path.resolve(options.static_path, 'style');
  const jsDirPath = path.resolve(options.static_path, 'js');
  const attachmentsDirPath = path.resolve(options.attachments_path);
  const watcher = chokidar.watch([DOCS, homeMdPath, cssDirPath, jsDirPath, attachmentsDirPath], {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  watcher
    .on('change', async (filepath) => {
      if (filepath.endsWith('.md')) {
        const stats = await getStat(filepath);
        createHTML([stats], options);
      }
      if (filepath.endsWith('.css')) {
        copyCSSFile(options);
        console.log(`♻️ \x1b[32;1m ${path.relative(cssDirPath, filepath)} \x1b[0m`);
      }
      if (filepath.endsWith('.js')) {
        copyJSFile(options);
        console.log(`♻️ \x1b[32;1m ${path.relative(jsDirPath, filepath)} \x1b[0m`);
      }
      const relativePath = path.relative(attachmentsDirPath, filepath);
      if (!/^\.\.\\/.test(relativePath)) {
        copyAttachments(options);
        console.log(`♻️ \x1b[32;1m ${path.relative(attachmentsDirPath, filepath)} \x1b[0m`);
      }
    })
    .on('error', (error) => console.log(`Watcher error: ${error}`));
}
