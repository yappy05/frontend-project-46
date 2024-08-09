import _ from "lodash";
import createAbsolutePath from "./createAbsolutePath.js";
import parsers from "./parsers.js";
import path from "path";

import compareTwoFiles from "./compareTwoFiles.js";

const file1 = createAbsolutePath("__fixtures__/deepfile-1.json");
const file2 = createAbsolutePath("__fixtures__/deepfile-2.json");

// const getPathChildren = (file) => {
//   const paths = [];
//   const iter = (node, filePath) => {
//     const children = _.keys(node).map((child) => {
//       const newFilePath = path.join(filePath, child);
//       if (_.isObject(node[child])) {
//         iter(node[child], newFilePath);
//         return;
//       }
//       paths.push(newFilePath);
//     });
//   };
//   iter(file, "");
//   const pathsWithDots = paths.map((item) => item.replaceAll("/", "."));
//   return pathsWithDots;
// };

// const getPathChildren = (file) => {
//   const paths = [];
//   const iter = (node, filePath) => {
//     const children = _.keys(node);
//     children.map((child, index, children) => {
//       const newFilePath = path.join(filePath, child);
//       if (_.isObject(node[child])) {
//         if (child.startsWith("- ")) {
//           paths.push(`Object, ${child}: "was removed"`);
//           return;
//         } else if (child.startsWith("+ ")) {
//           paths.push(`Object, ${child}: "was added"`);
//           return;
//         }
//         iter(node[child], newFilePath);
//         return;
//       }
//       if (child.startsWith("- ")) {
//         if (
//           children[index + 1].startsWith("+ ") &&
//           child.substring(2) === children[index + 1].substring(2)
//         ) {
//           paths.push(`${child}: "was appdeted"`);
//           index += 1;
//           return;
//         } else {
//           console.log(child);
//           paths.push(`${child}: "was removed"`);
//           return;
//         }
//       } else if (child.startsWith("+ ")) {
//         paths.push(`${child} "was added"`);
//         return;
//       }
//     });
//   };
//   iter(file, "");
//   return paths;
// };

const checkStringValue = (value) => {
  if (value === true) return true;
  if (value === false) return false;
  if (value === null) return null;
  return `'${value}'`;
};

const validValue = (node, key) => {
  if (_.isObject(_.get(node, key))) return "[complex value]";
  return checkStringValue(node[key]);
};

const getPathChildren = (file) => {
  const paths = [];
  const iter = (node, filePath) => {
    const children = _.keys(node);
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const newFilePath = path.join(filePath, child);
      if (_.isObject(node[child])) {
        if (child.startsWith("- ")) {
          if (
            children[i + 1].startsWith("+ ") &&
            child.substring(2) === children[i + 1].substring(2)
          ) {
            paths.push(`Property '${newFilePath}' was updated.`);
            i++;
            continue;
          }
          paths.push(`${newFilePath}: "was removed"`);
        } else if (child.startsWith("+ ")) {
          if (_.isObject(_.get(node, child))) {
            paths.push(
              `Property '${newFilePath}' was added with value: [complex value]`
            );
          } else {
            paths.push(
              `Property '${newFilePath}' was added with value: ${node[child]}`
            );
          }
        }
        iter(node[child], newFilePath);
      } else if (child.startsWith("- ")) {
        if (
          children[i + 1].startsWith("+ ") &&
          child.substring(2) === children[i + 1].substring(2)
        ) {
          paths.push(
            `Property '${newFilePath}' was updated. From ${checkStringValue(
              node[children[i]]
            )} to ${checkStringValue(node[children[i + 1]])}`
          );
          i++;
        } else {
          paths.push(`Property '${newFilePath}' was removed`);
        }
      } else if (child.startsWith("+ ")) {
        paths.push(
          `Property '${newFilePath}' was added with value: ${checkStringValue(
            node[child]
          )}`
        );
      }
    }
  };

  iter(file, "");
  const formatPaths = paths.map((item) =>
    item.replaceAll("/+ ", ".").replaceAll("/- ", ".").replaceAll("/", ".")
  );
  return formatPaths;
};

const plane = (Jsonfile) => {
  const arr = [];
  const children = _.keys(Jsonfile);
  //   console.log(children[3].substring(2) === children[4].substring(2));
  for (let i = 0; i < children.length; i++) {
    if (children[i].startsWith("- ")) {
      if (
        children[i + 1].startsWith("+ ") &&
        children[i].substring(2) === children[i + 1].substring(2)
      ) {
        arr.push("was appdeted");
        i++;
        continue;
      }
      arr.push("was removed");
      continue;
    } else if (children[i].startsWith("+ ")) {
      arr.push("was added");
    }
  }
  return arr;
  //   children.map((child) => {
  //     if (child.startsWith("+ ")) {
  //       children.map((item) => {
  //         if (item.startsWith("- ") && child.substring(2) === item.substring(2)) {
  //           arr.push("was appdeted");
  //         } else {
  //           arr.push("was added");
  //         }
  //       });
  //     } else if (child.startsWith("- ")) arr.push("was removed");
  //   });
  return arr;
};

let arr = getPathChildren(compareTwoFiles(parsers(file1), parsers(file2)));
console.log(arr);
// const nums = [1, 2, 3, 4, 5, 6, 7];
// nums.map((num, index, nums) => {
//   index++;
//   console.log(nums[index]);
// });

// arr = ["was added", "was removed", "was appdeted", "was added", "was added"];
// console.log(arr.map((item) => item.replaceAll("/", ".")));
// console.log(arr);
// console.log(parsers(getdiff(file1, file2)));
// console.log(plane(compareTwoFiles(parsers(file1), parsers(file2)).common));
// arr.map((iter, index, arr) => {
//   console.log(`${index}: ${iter}`);
// });

// console.log(plain(file));
// console.log(parsers(file1)["common"]);
// console.log(parsers(arr))
// const ob = {};
// console.log(_.isObject(parsers(file1)));
