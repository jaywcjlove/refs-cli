import path from 'path';

export const log =
  (mark: string = 'refs', flag: string = '\x1b[32;1m✔\x1b[0m') =>
  (filepath: string) => {
    console.log(`   ${flag} ${mark}: \x1b[37;1m${filepath}\x1b[0m`);
  };

export const output =
  (mark: string = 'refs') =>
  (form: string, to: string) => {
    console.log(`  \x1b[32;1m✔\x1b[0m ${mark}: \x1b[37;1m${form}\x1b[0m -> \x1b[32;1m${to}\x1b[0m`);
  };

export const error =
  (mark: string = 'refs') =>
  (form: string, to: string) => {
    console.error(`  \x1b[31;1m✖\x1b[0m ${mark}: \x1b[31;1m${form}\x1b[0m -> \x1b[31;1m${to}\x1b[0m`);
  };
