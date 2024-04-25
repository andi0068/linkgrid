import { useCallback } from 'react';

import * as clipboard from '@/utils/clipboard-utils';

import useFlash from './use-flash';

export interface UseCopyButtonProps {
  data: string;
}

export default function useCopyButton({ data }: UseCopyButtonProps) {
  const flash = useFlash({ duration: 1500 });

  const onClick = useCallback(() => {
    clipboard.writeText(data).then(flash.turnOn);
  }, [data]);

  return {
    flash,
    onClick,
  } as const;
}
