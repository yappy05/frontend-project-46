import parseJSON from "./parseJSON.js";
import _ from "lodash";

const isGeneralKey = (ob1, ob2, key) => {
  if (_.has(ob1, key) && _.has(ob2, key)) return true;
  return false;
};

const isSameValue = (ob1, ob2, key) => {
  if (_.get(ob1, key) === _.get(ob2, key)) return true;
  return false;
};

export default (path1, path2) => {
  const file1 = parseJSON(path1);
  const file2 = parseJSON(path2);

  const keysFile1 = _.keys(file1);
  const keysFile2 = _.keys(file2);

  const union = _.union(keysFile1, keysFile2).sort();
  const diff = union.reduce((acm, key) => {
    if (isGeneralKey(file1, file2, key) && isSameValue(file1, file2, key)) {
      acm += `\n    ${key}: ${_.get(file1, key)}`;
    } else {
      if (_.has(file1, key)) {
        acm += `\n  - ${key}: ${_.get(file1, key)}`;
      }
      if (_.has(file2, key)) {
        acm += `\n  + ${key}: ${_.get(file2, key)}`;
      }
    }
    if (key === union.at(-1)) acm += "\n}";
    return acm;
  }, "{");

  return diff;
};

// console.log(_.has(file1, "follow"));
// console.log(file1);

// console.log(IsGeneralKey(file1, file2, "timeout"));
// console.log(isSameValue(file1, file2, "timeout"));
// console.log(IsGeneralKey(file1, file2, "host"));
// console.log(isSameValue(file1, file2, "host"));
