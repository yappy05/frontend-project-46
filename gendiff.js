#!/usr/bin/env node
import { program } from "commander";

program.description("Compares two configuration files and shows a difference.");
program.version("0.0.1");
program.option("-f, --format [type]", "output format");
program.argument("<filePath1>", "path to first file");
program.argument("<filePath2>", "path to second file");

program.parse();
