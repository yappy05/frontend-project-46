#!/usr/bin/env node
import { program } from "commander";
import getdiff from "./src/getdiff.js";

program.description("Compares two configuration files and shows a difference.");
program.version("0.0.1");
program.option("-f, --format [type]", "output format", "stylish");
program
  .arguments("<filePath1>", "path to first file")
  .arguments("<filePath2>", "path to first file");
program.action((filePath1, filePath2) => {
  console.log(getdiff(filePath1, filePath2, program.opts().format));
});
program.parse();
