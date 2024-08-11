import compareTwoFiles from '../src/compareTwoFiles.js';
import json from '../src/formatters/json.js';
import createAbsolutePath from '../src/createAbsolutePath.js';
import parsers from '../src/parsers.js';

const file1 = createAbsolutePath('__fixtures__/deepfile-1.json');
const file2 = createAbsolutePath('__fixtures__/deepfile-2.json');
const result = createAbsolutePath('__fixtures__/resultFromatJson.json');

test('two json files', () => {
  expect(json(compareTwoFiles(parsers(file1), parsers(file2)))).toEqual(
    parsers(result),
  );
});
