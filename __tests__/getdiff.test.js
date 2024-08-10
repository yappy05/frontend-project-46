import getdiff from '../src/getdiff.js';
import createAbsolutePath from '../src/createAbsolutePath.js';
import parsers from '../src/parsers.js';

const fileJson1 = createAbsolutePath('__fixtures__/deepfile-1.json');
const fileJson2 = createAbsolutePath('__fixtures__/deepfile-2.json');
const fileYaml1 = createAbsolutePath('__fixtures__/deepfile-1.yml');
const fileYaml2 = createAbsolutePath('__fixtures__/deepfile-2.yaml');

const result = createAbsolutePath('__fixtures__/result2JsonFiles.txt');

test('two json files', () => {
  expect(getdiff(fileJson1, fileJson2)).toEqual(parsers(result));
});
test('two yaml files', () => {
  expect(getdiff(fileYaml1, fileYaml2)).toEqual(parsers(result));
});
