#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
program.description("Compares two configuration files and shows a difference.");
program.version("0.0.1");
program.parse();
// const { Command } = require("commander");
// const program = new Command();

// program
//   .argument("<name>")
//   .option("-t, --title <honorific>", "title to use before name")
//   .option("-d, --debug", "display some debugging")
//   .action((name, options, command) => {
//     if (options.debug) {
//       console.error("Called %s with options %o", command.name(), options);
//     }
//     const title = options.title ? `${options.title} ` : "";
//     console.log(`Thank-you ${title}${name}`);
//   });

// program.parse();
