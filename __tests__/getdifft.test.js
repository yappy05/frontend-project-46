import getdiff from "../src/getdiff";
// import { accessSync } from "node:fs";

const file1 = "files/file1.json";
const file2 = "files/file2.json";

test("correct values", () => {
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
