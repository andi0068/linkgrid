import { useState, useId } from 'react';

export default function useUniqueKey() {
  const [count, setCount] = useState(0);

  const id = useId();

  function regenerate() {
    setCount((s) => s + 1);
  }

  return {
    value: id + count,
    regenerate,
  } as const;
}
