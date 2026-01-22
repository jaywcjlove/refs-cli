#!/usr/bin/env node
import minimist from 'minimist';
import path from 'node:path';
import { autoConf } from 'auto-config-loader';
import { type Options, run, helpStr, __filename, type Config } from './utils/utils.js';
import watch from './watch.js';

(async () => {
  try {
    const argvs: Options = minimist(process.argv.slice(2), {
      alias: {
        watch: 'w',
        build: 'b',
        output: 'o',
        force: 'f',
      },
      default: {
        output: 'dist',
        force: false,
        build: true,
      },
    });
    if (argvs.h || argvs.help) {
      return console.log(helpStr);
    }
    argvs.static_path = path.resolve(__filename, '../../static');
    argvs.attachments_path = path.resolve(__filename, '../../attachments');

    argvs.output = path.resolve(argvs.output || 'dist');

    const conf = await autoConf<Config>('refs', {
      mustExist: false,
    });
    argvs.config = conf || {};
    if (argvs.watch) {
      await watch(argvs);
    } else if (argvs.build) {
      await run(argvs);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log('REFS:', error.message);
      console.log('REFS:', error);
      console.log(helpStr);
    }
  }
})();
