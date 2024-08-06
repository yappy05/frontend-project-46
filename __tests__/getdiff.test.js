import getdiff from "../src/getdiff.js";
import createAbsolutePath from "../src/createAbsolutePath.js";
import stylish from "../src/stylish.js";
import parsers from "../src/parsers.js";
import { readFileSync } from "node:fs";

const file1 = createAbsolutePath("__fixtures__/deepfile-1.json");
const file2 = createAbsolutePath("__fixtures__/deepfile-2.json");
const result = createAbsolutePath("__fixtures__/result2JsonFiles.txt");

test("two jsonFiles", () => {
  expect(getdiff(file1, file2)).toEqual(readFileSync(result, "utf-8"));
});
// console.log(getdiff(file1, file2).);
// console.log(readFileSync(result, "utf-8"));
