import { useState, useCallback } from 'react';

export type UseAsyncEventHandlerProps<P extends object = {}> = P & {
  handler(props: P): Promise<void>;
  onSuccess?(): void;
  onError?(reason: any): void;
};

export default function useAsyncEventHandler<P extends object = {}>(
  { handler, onSuccess, onError, ...props }: UseAsyncEventHandlerProps<P>,
  deps: React.DependencyList,
) {
  const [loading, setLoading] = useState(false);

  const eventHandler = useCallback(() => {
    setLoading(true);
    handler(props as P)
      .then(onSuccess)
      .catch(onError)
      .finally(() => setLoading(false));
  }, deps);

  return [{ loading }, eventHandler] as const;
}
