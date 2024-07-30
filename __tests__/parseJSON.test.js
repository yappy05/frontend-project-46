import path, { dirname } from "path";

import { fileURLToPath } from "url";
import parseJSON from "../src/parseJSON.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let file;
const fileJSON = {
  host: "hexlet.io",
  timeout: 50,
  proxy: "123.234.53.22",
  follow: false,
};

describe("correct path", () => {
  test("parse file, absolutely path", () => {
    file = path.join(__dirname, "..", "files", "file1.json");
    expect(parseJSON(file)).toEqual(fileJSON);
  });

  test("parse file, relative path", () => {
    file = "files/file1.json";
    expect(parseJSON(file)).toEqual(fileJSON);
  });
});
