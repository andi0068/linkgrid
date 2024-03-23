'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import * as Auth from '@/services/auth';
import { urlConfig } from '@/config/url';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    Auth.signOut().then(toLoginPage);
  }, []);

  function toLoginPage() {
    router.replace(urlConfig.auth.login);
  }

  return <></>;
}
