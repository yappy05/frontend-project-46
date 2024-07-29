import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import getdiff from '../src/getdiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// import { accessSync } from "node:fs";

const file1 = path.join(__dirname, '..', 'files', 'file1.json');
const file2 = path.join(__dirname, '..', 'files', 'file2.json');
// const file2 = "files/file2.json";

console.log(getdiff(file1, file2));

test('correct values', () => {
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(getdiff(file1, file2)).toBe(result);
});
