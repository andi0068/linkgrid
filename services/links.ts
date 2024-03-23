import { uuid } from '@/utils/uid-utils';

import * as db from './database';
import type { CreateProps, UpdateProps, RemoveProps, Link } from './links.types';

export async function create(values: CreateProps) {
  const id = uuid();
  const ref = db.linkRef(id);
  const value: Link = { id, ...values };

  return db.set(ref, value);
}

export async function get() {}

get.byUserUid = async function (userUid: string): Promise<Link[]> {
  const query = db.query(db.linksRef(), db.orderByChild('user_uid'), db.equalTo(userUid));

  return db.get(query).then((s) => (s.exists() ? Object.values(s.val()) : []));
};

export async function update({ id, ...values }: UpdateProps) {
  const ref = db.linkRef(id);

  return db.update(ref, values);
}

export async function remove({ id }: RemoveProps) {
  const ref = db.linkRef(id);

  return db.remove(ref);
}
