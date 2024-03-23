import * as fire from 'firebase/app';

import { firebaseConfig } from '@/config/firebase';

if (!fire.getApps().length) {
  fire.initializeApp(firebaseConfig);
}

export const app = fire.getApp();
