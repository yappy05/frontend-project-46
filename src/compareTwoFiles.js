import _ from 'lodash';

const isObject = (ob) => ob instanceof Object;
const hasKey = (ob, key) => (ob[key] ? ob[key] : {});
const isSameKey = (ob1, ob2, key) => !!(_.has(ob1, key) && _.has(ob2, key));
const isSameValue = (ob1, ob2, key) => _.get(ob1, key) === _.get(ob2, key);
const isSameKeyValue = (ob1, ob2, key) => isSameKey(ob1, ob2, key) && isSameValue(ob1, ob2, key);

const compareTwoFiles = (ob1, ob2) => {
  if (ob1 === null || ob2 === null) return null;
  const keysOb1 = _.keys(ob1);
  const keysOb2 = _.keys(ob2);
  const union = _.union(keysOb1, keysOb2).sort();
  //   console.log(union);
  const diff = union.reduce((acm, key) => {
    if (isObject(ob1[key]) && isObject(ob2[key])) {
      // acm[key] = compareTwoFiles(hasKey(ob1, key), hasKey(ob2, key));
      // return acm;
      return {
        ...acm,
        [key]: compareTwoFiles(hasKey(ob1, key), hasKey(ob2, key)),
      };
    }

    if (isSameKeyValue(ob1, ob2, key)) {
      // acm[`${key}`] = _.get(ob1, key);
      return { ...acm, [key]: _.get(ob1, key) };
    }
    let stepAcm = {};
    if (_.has(ob1, key)) stepAcm = { ...acm, [`- ${key}`]: _.get(ob1, key) };
    if (_.has(ob2, key)) { stepAcm = { ...stepAcm, ...acm, [`+ ${key}`]: _.get(ob2, key) }; }

    return { ...stepAcm };
  }, {});
  return diff;
};

export default compareTwoFiles;
