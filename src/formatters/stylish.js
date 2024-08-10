import _ from 'lodash';

export default (fileJSON) => {
  const iter = (node, deep) => {
    const keys = _.keys(node);
    const style = keys.reduce((acm, key) => {
      let cloneAcm = _.cloneDeep(acm);
      const spaceCount = key.startsWith('+ ') || key.startsWith('- ') ? 4 * deep - 2 : 4 * deep;
      if (_.isObject(node[key])) {
        cloneAcm += `${' '.repeat(spaceCount)}${key}: {\n${iter(
          node[key],
          deep + 1,
        )}${' '.repeat(4 * deep)}}\n`;
        return cloneAcm;
      }
      cloneAcm += `${' '.repeat(spaceCount)}${key}: ${_.get(node, key)}\n`;
      return cloneAcm;
    }, '');
    return style;
  };
  const result = iter(_.cloneDeep(fileJSON), 1);
  return `{\n${result}}`;
};
