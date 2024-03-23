import * as fire from 'firebase/auth';

import { isObject } from '@/utils/is-utils';

import { app } from './app';
import * as Users from './users';
import type { SignInProps, SignUpProps, SendPasswordResetEmailProps } from './auth.types';

export const auth = fire.getAuth(app);

export async function signIn({ email, password }: SignInProps) {
  return fire.signInWithEmailAndPassword(auth, email, password);
}

export async function signUp({ email, password }: SignUpProps) {
  return fire
    .createUserWithEmailAndPassword(auth, email, password)
    .then((value) => Users.create({ uid: value.user.uid, email }).then(() => value));
}

export async function sendPasswordResetEmail({ email }: SendPasswordResetEmailProps) {
  return Users.get.byEmailOne(email).then((user) => {
    if (user) return fire.sendPasswordResetEmail(auth, email);
    throw { code: 'auth/email-not-registered' };
  });
}

export async function signOut() {
  return fire.signOut(auth);
}

export function getErrorCode(err: any, fallback?: string) {
  return isObject(err) && 'code' in err ? (err.code as string) : fallback;
}
