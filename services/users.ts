import { all, first } from '@/utils/get-service-utils';
import { isObject } from '@/utils/is-utils';

import * as db from './database';
import * as storage from './users.storage';
import type {
  CreateProps,
  GetByUsernameReturn,
  GetByUsernameOneReturn,
  UpdateProps,
  User,
} from './users.types';

export async function create(values: CreateProps) {
  const ref = db.userRef(values.uid);
  const value: User = { ...values };

  return db.set(ref, value);
}

export async function get() {}

get.byEmailOne = async function (email: string): Promise<User | null> {
  const query = db.query(db.usersRef(), db.orderByChild('email'), db.equalTo(email));

  return db.get(query).then((s) => first(s.val()));
};

get.byUid = async function (uid: string): Promise<User | null> {
  const ref = db.userRef(uid);

  return db.get(ref).then((s) => s.val());
};

get.byUsername = async function (username: string): Promise<GetByUsernameReturn> {
  const query = db.query(db.usersRef(), db.orderByChild('username'), db.equalTo(username));

  return db.get(query).then((s) => all(s.val()));
};

get.byUsernameOne = async function (username: string): Promise<GetByUsernameOneReturn> {
  const query = db.query(db.usersRef(), db.orderByChild('username'), db.equalTo(username));

  return db.get(query).then((s) => first(s.val()));
};

export async function update({ uid, ...values }: UpdateProps) {
  if (values.username) {
    const users = await get.byUsername(values.username);

    if (users.filter((user) => user.uid !== uid).length) {
      throw { code: 'users/username-already-in-use' };
    }
  }

  const ref = db.userRef(uid);

  if (values.image) {
    const user = await get.byUid(uid);

    const uploadedImage = await storage.upload(uid, values.image);
    await db.update(ref, { ...values, image: uploadedImage.metadata.name });
    if (user?.image) await storage.remove(uid, user.image);
    return;
  }
  if (values.image === null) {
    const user = await get.byUid(uid);

    await db.update(ref, values);
    if (user?.image) await storage.remove(uid, user.image);
    return;
  }
  await db.update(ref, values);
}

export function onUsername(uid: string, cb: (value: string | null) => void) {
  const ref = db.userRef(uid, '/username');

  return db.onValue(ref, (s) => cb(s.val()));
}

export function getErrorCode(err: any, fallback?: string) {
  return isObject(err) && 'code' in err ? (err.code as string) : fallback;
}

export * as storage from './users.storage';
