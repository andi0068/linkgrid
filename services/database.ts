import * as fire from 'firebase/database';

import { join } from '@/utils/path-utils';

import { app } from './app';

export const database = fire.getDatabase(app);

export function usersRef() {
  return fire.ref(database, '/users');
}

export function userRef(uid: string, path?: string) {
  return fire.ref(database, join(`/users/${uid}`, path));
}

export function linksRef() {
  return fire.ref(database, '/links');
}

export function linkRef(id: string) {
  return fire.ref(database, `/links/${id}`);
}

export { set, get, update, remove, query, orderByChild, equalTo, onValue } from 'firebase/database';
