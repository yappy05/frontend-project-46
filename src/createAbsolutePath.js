import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (file) => {
  const arr = file.split('/').map((part) => part.replace('/', ''));
  return path.join(__dirname, '..', ...arr);
};
