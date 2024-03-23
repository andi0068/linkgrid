import { Slot } from '@radix-ui/react-slot';

import type { BaseProps, WithAsProp } from '@/types';

interface MessageProps {
  error?: string;
}

export function Form({ children, asChild }: WithAsProp<BaseProps>) {
  const Comp = asChild ? Slot : 'div';
  return <Comp className="flex flex-col space-y-2.5">{children}</Comp>;
}

export function Message({ error }: MessageProps) {
  return error ? (
    <p
      role="alert"
      className="p-2 text-sm border-t border-foreground-danger/20 rounded text-foreground-danger bg-foreground-danger/20"
    >
      {error}
    </p>
  ) : (
    <></>
  );
}
