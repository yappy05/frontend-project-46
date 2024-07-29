import _ from 'lodash';
import parseJSON from './parseJSON.js';

const isGeneralKey = (ob1, ob2, key) => {
  if (_.has(ob1, key) && _.has(ob2, key)) return true;
  return false;
};

const isSameValue = (ob1, ob2, key) => {
  if (_.get(ob1, key) === _.get(ob2, key)) return true;
  return false;
};

const coverJsontoString = (json) => JSON.stringify(json, null, 1).replaceAll('"', '').replaceAll(',', '');

export default (path1, path2) => {
  const file1 = parseJSON(path1);
  const file2 = parseJSON(path2);

  const keysFile1 = _.keys(file1);
  const keysFile2 = _.keys(file2);

  const union = _.union(keysFile1, keysFile2).sort();
  const diff = union.reduce((accumulator, key) => {
    if (isGeneralKey(file1, file2, key) && isSameValue(file1, file2, key)) {
      accumulator[`   ${key}`] = _.get(file1, key);
    } else {
      if (_.has(file1, key)) {
        accumulator[` - ${key}`] = _.get(file1, key);
      }
      if (_.has(file2, key)) {
        accumulator[` + ${key}`] = _.get(file2, key);
      }
    }
    return accumulator;
  }, {});
  return coverJsontoString(diff);
};
// console.log(func("files/file1.json", "files/file2.json"));
