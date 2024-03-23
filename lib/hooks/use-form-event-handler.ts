import { useState, useCallback } from 'react';

import useUniqueKey from './use-unique-key';

type Handler = React.FormEventHandler<HTMLFormElement>;
type State = Readonly<{
  loading: boolean;
  error?: string;
}>;

interface CallBackProps<Fields extends object> {
  fields: Fields;
  setError(value: string | undefined): void;
}

export default function useFormEventHandler<T extends object>(
  cb: (props: CallBackProps<T>) => Promise<void>,
  deps: React.DependencyList,
) {
  const [state, dispatch] = useState<State>({ loading: false });

  const uniqueKey = useUniqueKey();

  const onSubmit: Handler = useCallback((ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const fields = fdToObject(fd) as T;

    dispatch((s) => ({ ...s, loading: true }));
    cb({ fields, setError }).finally(() => dispatch((s) => ({ ...s, loading: false })));
  }, deps);

  const onReset: Handler = useCallback((ev) => {
    ev.preventDefault();
    uniqueKey.regenerate();
  }, []);

  function setError(error?: string) {
    dispatch((s) => ({ ...s, error }));
  }

  return {
    key: uniqueKey.value,
    state,
    onSubmit,
    onReset,
  } as const;
}

function fdToObject(fd: FormData) {
  const fields: Record<string, FormDataEntryValue> = {};

  fd.forEach((val, key) => {
    fields[key] = val;
  });

  return fields;
}
