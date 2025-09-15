import path from 'path';

export const log =
  (mark: string = 'refs') =>
  (filepath: string) => {
    console.log(`  \x1b[32;1m✔\x1b[0m ${mark}: \x1b[37;1m${filepath}\x1b[0m`);
  };

export const output =
  (mark: string = 'idoc') =>
  (form: string, to: string) => {
    console.log(`  \x1b[32;1m✔\x1b[0m ${mark}: \x1b[37;1m${form}\x1b[0m -> \x1b[32;1m${to}\x1b[0m`);
  };
