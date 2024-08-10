import stylish from './stylish.js';
import plain from './plain.js';

const buildFrormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plane':
      return plain;
    default:
      return stylish;
  }
};

export default buildFrormatter;
