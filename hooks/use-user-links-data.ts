import { useState, useEffect, useCallback } from 'react';

import { get } from '@/services/links';
import type { Link } from '@/services/links.types';

type State = Readonly<{
  loading: boolean;
  data: Link[];
}>;

interface UseUserLinksDataProps {
  uid: string;
}

const cache = {
  state: {
    loading: true,
    data: [] as Link[],
  },
};

export default function useUserLinksData(
  { uid }: UseUserLinksDataProps,
  deps: React.DependencyList,
) {
  const [state, dispatch] = useState<State>(cache.state);

  const onFetch = useCallback(() => {
    get.byUserUid(uid).then((links) => {
      const newState: State = {
        loading: false,
        data: links,
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
