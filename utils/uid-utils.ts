import { v4 as uuid } from 'uuid';

export function uniqidFilename(filename: string) {
  return `${uuid()}.${getFileExt(filename)}`;
}

function getFileExt(filename: string) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export { uuid };
