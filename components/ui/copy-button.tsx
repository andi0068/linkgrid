'use client';
import useCopyButton from '@/lib/hooks/use-copy-button';

import Button, { type ButtonOptions } from './button';

export interface CopyButtonProps extends ButtonOptions {
  data: string;
}

export default function CopyButton({ data, ...props }: CopyButtonProps) {
  const { flash, onClick } = useCopyButton({ data });
  return (
    <Button type="button" onClick={onClick} className="justify-between" {...props}>
      <span className="truncate">{data}</span>
      {flash.isOn ? (
        <span role="alert" className="ml-4 text-foreground-accent">
          Copied!
        </span>
      ) : (
        <span className="ml-4">Copy</span>
      )}
    </Button>
  );
}
