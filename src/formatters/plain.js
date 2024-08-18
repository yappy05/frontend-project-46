import _, { isNumber } from "lodash";
import path from "path";
import compareTwoFiles from "../compareTwoFiles.js";
import parsers from "../parsers.js";
import createAbsolutePath from "../createAbsolutePath.js";

// import compareTwoFiles from "./compareTwoFiles.js";

const file1 = createAbsolutePath("__fixtures__/deepfile-1.json");
const file2 = createAbsolutePath("__fixtures__/deepfile-2.json");

const checkStringValue = (node, key) => {
  const value = _.get(node, key);
  if (value === true) return true;
  if (value === false) return false;
  if (value === null) return null;
  if (isNumber(value)) return value;
  return `'${value}'`;
};

const validValue = (node, key) => {
  if (_.isObject(_.get(node, key))) return "[complex value]";
  return checkStringValue(node, key);
};

const plain = (file) => {
  const paths = [];
  const iter = (node, filePath) => {
    const children = _.keys(node);
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      const newFilePath = path.join(filePath, child);
      if (_.isObject(node[child])) {
        if (child.startsWith("- ")) {
          if (
            children[i + 1] != undefined &&
            children[i + 1].startsWith("+ ") &&
            child.substring(2) === children[i + 1].substring(2)
          ) {
            paths.push(
              `Property '${newFilePath}' was updated. From ${validValue(
                node,
                child
              )} to ${validValue(node, children[i + 1])}`
            );
            i += 1;
            // continue;
          } else paths.push(`Property '${newFilePath}' was removed`);
        } else if (child.startsWith("+ ")) {
          paths.push(
            `Property '${newFilePath}' was added with value: ${validValue(
              node,
              child
            )}`
          );
        }
        iter(node[child], newFilePath);
      } else if (child.startsWith("- ")) {
        if (
          children[i + 1] != undefined &&
          children[i + 1].startsWith("+ ") &&
          child.substring(2) === children[i + 1].substring(2)
        ) {
          paths.push(
            `Property '${newFilePath}' was updated. From ${validValue(
              node,
              child
            )} to ${validValue(node, children[i + 1])}`
          );
          i += 1;
        } else {
          paths.push(`Property '${newFilePath}' was removed`);
        }
      } else if (child.startsWith("+ ")) {
        paths.push(
          `Property '${newFilePath}' was added with value: ${validValue(
            node,
            child
          )}`
        );
      }
    }
  };

  iter(file, "");
  const formatPaths = paths.map((item) =>
    item
      .replaceAll("/+ ", ".")
      .replaceAll("/- ", ".")
      .replaceAll("/", ".")
      .replaceAll("- ", "")
      .replaceAll("+ ", "")
  );
  const result = formatPaths.join("\n");
  return result;
};
console.log(plain(compareTwoFiles(parsers(file1), parsers(file2))));

export default plain;
