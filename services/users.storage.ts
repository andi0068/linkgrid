import { uniqidFilename } from '@/utils/uid-utils';

import * as storage from './storage';

export async function upload(uid: string, file: File) {
  const ref = storage.userRef(uid, `/${uniqidFilename(file.name)}`);

  return storage.uploadBytes(ref, file);
}

export async function get(uid: string, filename: string) {
  const ref = storage.userRef(uid, `/${filename}`);

  return storage.getDownloadURL(ref);
}

export async function remove(uid: string, filename: string) {
  const ref = storage.userRef(uid, `/${filename}`);

  return storage.deleteObject(ref);
}
