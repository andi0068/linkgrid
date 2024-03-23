import * as fire from 'firebase/storage';

import { join } from '@/utils/path-utils';

import { app } from './app';

export const storage = fire.getStorage(app);

export function userRef(uid: string, path?: string) {
  return fire.ref(storage, join(`/users/${uid}`, path));
}

export { uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
