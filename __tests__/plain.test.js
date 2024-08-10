import plain from '../src/formatters/plain.js';
import createAbsolutePath from '../src/createAbsolutePath.js';
import parsers from '../src/parsers.js';
import compareTwoFiles from '../src/compareTwoFiles.js';

const file1 = createAbsolutePath('__fixtures__/deepfile-1.json');
const file2 = createAbsolutePath('__fixtures__/deepfile-2.json');
const resultPlaneFormat = createAbsolutePath(
  '__fixtures__/resultPlaneFormat.txt',
);

test('two json files', () => {
  expect(plain(compareTwoFiles(parsers(file1), parsers(file2)))).toEqual(
    parsers(resultPlaneFormat),
  );
});

// console.log(parsers(resultPlaneFormat));
