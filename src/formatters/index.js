import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const buildFrormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plane':
      return plain;
    case 'json':
      return json;
    default:
      return stylish;
  }
};

export default buildFrormatter;
