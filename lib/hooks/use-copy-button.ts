import { useCallback } from 'react';

import useFlash from './use-flash';

export interface UseCopyButtonProps {
  data: string;
}

export default function useCopyButton({ data }: UseCopyButtonProps) {
  const flash = useFlash({ duration: 1500 });

  const onClick = useCallback(() => {
    copy(data).then(flash.turnOn);
  }, [data]);

  return {
    flash,
    onClick,
  } as const;
}

async function copy(data: string) {
  if (!('clipboard' in window.navigator)) return;
  return window.navigator.clipboard.writeText(data);
}
