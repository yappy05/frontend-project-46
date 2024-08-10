import parsers from './parsers.js';
import compareTwoFiles from './compareTwoFiles.js';
import buildFrormatter from './formatters/index.js';

const getdiff = (file1, file2, formater = 'stylish') => {
  const fromatFile1 = parsers(file1);
  const fromatFile2 = parsers(file2);
  const diff = compareTwoFiles(fromatFile1, fromatFile2);
  const style = buildFrormatter(formater);

  return style(diff);
};
export default getdiff;
