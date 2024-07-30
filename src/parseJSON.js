import { accessSync, readFileSync } from 'node:fs';

export default (path) => {
  if (path == undefined) return null;
  try {
    // проверки существования относительного и абсолютного пути
    accessSync(path);
    const arrayJSON = readFileSync(path, 'utf-8');
    return JSON.parse(arrayJSON);
  } catch (err) {
    return null; // Или возвращайте undefined, если хотите
  }
};

// Пример использования
// const result = func("file1.json");
// console.log(result);

// const func = (path) => {
//   try {
//     accessSync(path);
//     const arrayJSON = [];
//     const file = open(path);
//     for (const line of file.readLines()) {
//       arrayJSON.push(line);
//     }
//     return JSON.parse(arrayJSON.join(""));
//     // return arrayJSON;
//   } catch (err) {
//     console.log("no access");
//   }
// };

// const result = func("file1.json");
// console.log(result);
