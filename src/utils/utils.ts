import fs from 'fs-extra';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import recursiveReaddirFiles, { IFileDirStat } from 'recursive-readdir-files';
import { create } from './create.js';
import { ParsedArgs } from 'minimist';

export const __filename = fileURLToPath(import.meta.url);

export const OUTOUT = path.resolve(process.cwd(), 'dist');
export const DOCS = path.resolve(process.cwd(), 'docs');
/** 搜索数据路径 */
export const SEARCH_DATA = path.resolve(OUTOUT, 'data.json');
export const SEARCH_DATA_JS = path.resolve(OUTOUT, 'data.js');
export const SEARCH_DATA_CACHE = path.resolve(process.cwd(), 'node_modules/.cache/reference-cli/data.json');

export async function copyCSSFile(options: Options) {
  await fs.copy(path.resolve(options.static_path, './style'), path.resolve(options.output, 'style'));
}

export async function copyJSFile(options: Options) {
  await fs.copy(path.resolve(options.static_path, './js'), path.resolve(options.output, 'js'));
}

export interface Options extends Partial<ParsedArgs> {
  static_path?: string;
  watch?: boolean;
  build?: boolean;
  output?: string;
  force?: boolean;
}

export async function run(options: Options) {
  options.output = path.resolve(options.output || OUTOUT);
  options.static_path = path.resolve(__filename, '../../../static');
  try {
    await fs.ensureDir(options.output);
    await fs.emptyDir(options.output);
    await fs.ensureDir(path.resolve(options.static_path, './style'));
    await fs.ensureFile(SEARCH_DATA_CACHE);
    await fs.writeFile(SEARCH_DATA_CACHE, '{}');
    await fs.writeFile(SEARCH_DATA, '[]');
    await copyCSSFile(options);
    await copyJSFile(options);
    const files = await recursiveReaddirFiles(process.cwd(), {
      ignored: /[\\/](node_modules|\.git)/g,
      exclude: /(\.json|\.mjs|CONTRIBUTING\.md)$/,
      filter: (item) => item.ext === 'md',
    });
    createHTML(files, options);
  } catch (error) {
    console.log('ERR:', error);
  }
}


export async function createHTML(files: IFileDirStat[] = [], opts: Options, num = 0) {
  const dataFile = files[num];
  if (!dataFile) {
    console.log(' \n done!\n');
    return;
  }
  ++num;
  const githubURL = `https://github.com/jaywcjlove/reference/blob/main/${path
    .relative(process.cwd(), dataFile.path)
    .replace(path.sep, '/')}`;

  const mdstr = await fs.readFile(dataFile.path);
  const htmlPath = path.relative(DOCS, dataFile.path);
  const outputHTMLPath = path
    .resolve(OUTOUT, 'docs', htmlPath)
    .replace(/README.md$/i, 'index.html')
    .replace(/.md$/, '.html');

  await fs.ensureDir(path.dirname(outputHTMLPath));
  const options = {
    filename: path.basename(outputHTMLPath, '.html'),
    isHome: /README.md$/.test(path.relative(process.cwd(), dataFile.path)),
    githubURL,
    homePath: path.relative(path.dirname(outputHTMLPath), path.resolve(OUTOUT, 'index.html')),
    css: [
      path.relative(path.dirname(outputHTMLPath), path.resolve(OUTOUT, 'style/style.css')),
      path.relative(path.dirname(outputHTMLPath), path.resolve(OUTOUT, 'style/katex.css')),
    ],
  };
  const { html, data } = create(mdstr.toString(), { ...options, ...opts });
  if (!options.isHome) {
    const searchData = await fs.readJSON(SEARCH_DATA_CACHE);
    data.path = path.relative(OUTOUT, outputHTMLPath).replace(/[\\/]/g, '/');
    searchData[options.filename] = data;
    searchData.name = options.filename;
    await fs.writeJSON(SEARCH_DATA_CACHE, searchData);
    const resultSearchData = Object.keys({ ...searchData })
      .map((name) => searchData[name])
      .filter((item) => typeof item !== 'string');
    await fs.writeJSON(SEARCH_DATA, resultSearchData);
    await fs.writeFile(SEARCH_DATA_JS, `const REFS_DATA = ${JSON.stringify(resultSearchData)}`);
  }
  await fs.writeFile(outputHTMLPath, html);
  console.log(`♻️ \x1b[32;1m ${path.relative(OUTOUT, outputHTMLPath)} \x1b[0m`);
  createHTML(files, opts, num);
}

const pkg = fs.readJSONSync(path.resolve(__filename, '../../../package.json'));

export const helpStr = `
  Usage: \x1b[34;1mreference-cli\x1b[0m [output-dir] [--help|h]

    Displays help information.

  Options:

    --version, -v   Show version number
    --help, -h      Displays help information.
    --watch, -w     Watch and compile Markdown files.
    --output, -o    Output directory. defalut(dist)
    --force, -f     Force file regeneration.

  Example:

    $\x1b[35m npx\x1b[0m reference-cli
    $\x1b[35m reference-cli\x1b[0m --watch
    $\x1b[35m reference-cli\x1b[0m --output website
    $\x1b[35m reference-cli\x1b[0m 

  reference-cli@v${pkg.version}
`;