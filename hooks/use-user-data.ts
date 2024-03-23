import { useState, useEffect, useCallback } from 'react';

import { get, storage } from '@/services/users';
import type { User } from '@/services/users.types';

type State = Readonly<{
  loading: boolean;
  data: User | null;
}>;

interface UseUserDataProps {
  uid: string;
}

const cache = {
  state: {
    loading: true,
    data: null as User | null,
  },
};

export default function useUserData({ uid }: UseUserDataProps, deps: React.DependencyList) {
  const [state, dispatch] = useState<State>(cache.state);

  const onFetch = useCallback(() => {
    get
      .byUid(uid)
      .then((user) => setActualImage(uid, user))
      .then((user) => {
        const newState: State = {
          loading: false,
          data: user,
        };

        dispatch(newState);
        cache.state = newState;
      });
  }, deps);

  useEffect(onFetch, [onFetch]);

  return {
    ...state,
    onFetch,
  } as const;
}

function setActualImage(uid: string, user: User | null) {
  if (!user?.image) return user;
  return storage.get(uid, user.image).then((image) => ({ ...user, image }));
}
