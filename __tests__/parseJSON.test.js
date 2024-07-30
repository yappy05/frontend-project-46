import parseJSON from "../src/parseJSON.js";

let file;
const fileJSON = {
  host: "hexlet.io",
  timeout: 50,
  proxy: "123.234.53.22",
  follow: false,
};

describe("correct path", () => {
  test("parse file, relative path", () => {
    file = "files/file1.json";
    expect(parseJSON(file)).toEqual(fileJSON);
  });
});

describe("wrong path", () => {
  test("no exist file", () => {
    file = "no/exist/file";
    expect(parseJSON(file)).toBeNull();
  });
  test("empety path", () => {
    expect(parseJSON()).toBeNull();
  });
});
