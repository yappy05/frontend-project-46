import stylish from "../src/formatters/stylish";
import compareTwoFiles from "../src/compareTwoFiles";
import parsers from "../src/parsers";
import createAbsolutePath from "../src/createAbsolutePath";

const file1 = createAbsolutePath("__fixtures__/deepfile-1.json");
const file2 = createAbsolutePath("__fixtures__/deepfile-2.json");
const result = createAbsolutePath("__fixtures__/result2JsonFiles.txt");

test("default check", () => {
  expect(stylish(compareTwoFiles(parsers(file1), parsers(file2)))).toEqual(
    parsers(result)
  );
});
