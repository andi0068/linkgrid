import { useState, useEffect } from 'react';

import { onUsername } from '@/services/users';

type State = Readonly<{
  loading: boolean;
  data: string | null;
}>;

interface UseUsernameDataProps {
  uid: string;
}

export default function useUsernameData({ uid }: UseUsernameDataProps, deps: React.DependencyList) {
  const [state, dispatch] = useState<State>({
    loading: true,
    data: null,
  });

  useEffect(() => onUsername(uid, (data) => dispatch({ loading: false, data })), deps);

  return state;
}
