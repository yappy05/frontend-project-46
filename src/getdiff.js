import _ from "lodash";
import parseJSON from "./parseJSON.js";

const isObject = (ob) => (ob instanceof Object ? true : false);
const hasKey = (ob, key) => (ob[key] ? ob[key] : {});
const isSameKey = (ob1, ob2, key) =>
  _.has(ob1, key) && _.has(ob2, key) ? true : false;
const isSameValue = (ob1, ob2, key) =>
  _.get(ob1, key) === _.get(ob2, key) ? true : false;
const isSameKeyValuePair = (ob1, ob2, key) =>
  isSameKey(ob1, ob2, key) && isSameValue(ob1, ob2, key);
const coverJsontoString = (json) =>
  JSON.stringify(json, null, 1).replaceAll('"', "").replaceAll(",", "");

const getdiff = (ob1, ob2) => {
  const keysOb1 = _.keys(ob1);
  const keysOb2 = _.keys(ob2);
  const union = _.union(keysOb1, keysOb2).sort();
  //   console.log(union);
  const diff = union.reduce((acm, key) => {
    if (isObject(ob1[key]) && isObject(ob2[key])) {
      acm[key] = getdiff(hasKey(ob1, key), hasKey(ob2, key));
      return acm;
    }

    if (isSameKeyValuePair(ob1, ob2, key)) {
      acm["" + key] = _.get(ob1, key);
    } else {
      if (_.has(ob1, key)) acm["- " + key] = _.get(ob1, key);
      if (_.has(ob2, key)) acm["+ " + key] = _.get(ob2, key);
    }
    return acm;
  }, {});
  return diff;
};
export default getdiff;
// console.log(func("files/file1.json", "files/file2.json"));
