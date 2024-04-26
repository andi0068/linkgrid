import { useId, useMemo } from 'react';

export function useIds<T extends string>(...suffix: T[]) {
  const id = useId();

  return useMemo(() => generateIds(id, suffix), [id, suffix]);
}

function generateIds<T extends string>(id: string, suffix: T[]) {
  const obj = {} as Record<T, string>;

  suffix.forEach((s) => (obj[s] = `${id}--${s}`));

  return obj;
}
