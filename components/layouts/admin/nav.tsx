import { Slot } from '@radix-ui/react-slot';

import type { BaseProps, WithAsProp } from '@/types';

export function Root({ children }: BaseProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-10 border-t border-separator bg-background/20 backdrop-blur-md">
      {children}
    </nav>
  );
}

export function Content({ children }: BaseProps) {
  return <div className="flex h-16">{children}</div>;
}

export function Anchor({ children, asChild }: WithAsProp<BaseProps>) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp className="grow inline-flex items-center justify-center py-3 text-xs font-medium border-t border-transparent text-foreground-secondary aria-[current]:border-current aria-[current]:text-inherit">
      {children}
    </Comp>
  );
}
