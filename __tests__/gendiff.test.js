import getdiff from '../src/getdiff.js';
import createAbsolutePath from '../src/createAbsolutePath.js';

let fileJson1;
let fileJson2;
let fileYaml1;
let fileYaml2;
let result;

beforeEach(() => {
  fileJson1 = createAbsolutePath('__fixtures__/file-1.json');
  fileJson2 = createAbsolutePath('__fixtures__/file-2.json');

  fileYaml1 = createAbsolutePath('__fixtures__/file-1.yaml');
  fileYaml2 = createAbsolutePath('__fixtures__/file-2.yml');

  result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
});

test('check 2 json files', () => {
  expect(getdiff(fileJson1, fileJson2)).toEqual(result);
});

test('check 2 yaml files', () => {
  expect(getdiff(fileYaml1, fileYaml2)).toEqual(result);
});

test('check 2 diffrent files: json, yml', () => {
  expect(getdiff(fileYaml1, fileYaml2)).toEqual(result);
});
