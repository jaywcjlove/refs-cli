#!/usr/bin/env node
import minimist from 'minimist';
import path from 'node:path';
import { Options, run, helpStr, __filename } from './utils/utils.js';
import watch from './watch.js';

;(async () => {
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
    if (argvs.watch) {
      await watch(argvs);
    } else if (argvs.build) {
      await run(argvs);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log('REFS:', error.message)
      console.log('REFS:', error)
      console.log(helpStr);
    }
  }
})();