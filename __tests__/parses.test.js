import createAbsolutePath from '../src/createAbsolutePath.js';
import parsers from '../src/parsers.js';

let fileJson1;
// let fileJson2;
// let fileYaml1;
// let fileYaml2;

beforeEach(() => {
  fileJson1 = createAbsolutePath('__fixtures__/file-1.json');
  // fileJson2 = createAbsolutePath('__fixtures__/file-2.json');

  // fileYaml1 = createAbsolutePath('__fixtures__/file-1.yaml');
  // fileYaml2 = createAbsolutePath('__fixtures__/file-2.yml');
});

test('correct value', () => {
  const result = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(parsers(fileJson1)).toEqual(result);
});

test('no exist file', () => {
  expect(parsers('no/exist/file')).toBeUndefined();
});

test('no parametr', () => {
  expect(parsers()).toBeUndefined();
});
