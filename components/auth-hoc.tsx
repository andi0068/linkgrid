'use client';
import { useRouter } from 'next/navigation';
import { Fragment, useState, useEffect, useCallback } from 'react';

import { auth } from '@/services/auth';
import type { User } from '@/services/auth.types';
import type { BaseProps } from '@/types';

interface AuthHocProps extends BaseProps {
  redirects: {
    false?: string;
    true?: string;
  };
  defaultLoading?: boolean;
  loader?: React.FC;
}

export default function AuthHoc({
  children,
  redirects,
  defaultLoading = true,
  loader: Loader = Fragment,
}: AuthHocProps) {
  const [loading, setLoading] = useState(defaultLoading);

  const router = useRouter();

  const cb = useCallback((user: User | null) => {
    if (user) {
      if (redirects.true) {
        router.replace(redirects.true);
      } else {
        setLoading(false);
      }
      return;
    }

    if (redirects.false) {
      router.replace(redirects.false);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => auth.onAuthStateChanged(cb), [cb]);

  return <>{loading ? <Loader /> : children}</>;
}
