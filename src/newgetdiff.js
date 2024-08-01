import parsers from "./parsers.js";
import _ from "lodash";

const ob1 = {
  common: {
    setting1: "Value 1",
    setting2: 200,
    setting3: true,
    setting6: {
      key: "value",
      doge: {
        wow: "",
      },
    },
  },
  group1: {
    baz: "bas",
    foo: "bar",
    nest: {
      key: "value",
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const ob2 = {
  common: {
    follow: false,
    setting1: "Value 1",
    setting3: null,
    setting4: "blah blah",
    setting5: {
      key5: "value5",
    },
    setting6: {
      key: "value",
      ops: "vops",
      doge: {
        wow: "so much",
      },
    },
  },
  group1: {
    foo: "bar",
    baz: "bars",
    nest: "str",
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

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

// console.log(hasKey(ob2, "adress"));
// console.log(isObject(ob1.adress));

const getdiff = (ob1, ob2) => {
  const keysOb1 = _.keys(ob1);
  const keysOb2 = _.keys(ob2);
  const union = _.union(keysOb1, keysOb2).sort();
  //   console.log(union);
  const diff = union.reduce((acm, key) => {
    if (isObject(ob1[key]) || isObject(ob2[key])) {
      acm[key] = getdiff(hasKey(ob1, key), hasKey(ob2, key));
      return acm;
    }

    if (isSameKeyValuePair(ob1, ob2, key)) {
      acm["   " + key] = _.get(ob1, key);
    } else {
      if (_.has(ob1, key)) acm[" - " + key] = _.get(ob1, key);
      if (_.has(ob2, key)) acm[" + " + key] = _.get(ob2, key);
    }
    return acm;
  }, {});
  return diff;
};

console.log(coverJsontoString(getdiff(ob1, ob2)));

// const func = (path1, path2) => {
//   const file1 = parsers(path1);
//   const file2 = parsers(path2);
//   console.log(file1);
// };

// func("__fixtures__/deepfile-1.json", "__fixtures__/deepfile-2.json");
