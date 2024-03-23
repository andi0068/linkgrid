import { Slot } from '@radix-ui/react-slot';

import type { BaseProps, WithAsProp } from '@/types';

export function Root({ children }: BaseProps) {
  return <header className="pt-16 pb-8">{children}</header>;
}

export function Content({ children }: BaseProps) {
  return <div className="text-center">{children}</div>;
}

export function Image({ children, asChild }: WithAsProp<BaseProps>) {
  const Comp = asChild ? Slot : 'img';
  return (
    <Comp width={96} height={96} className="object-cover inline-block mb-4 w-24 h-24 rounded-full">
      {children}
    </Comp>
  );
}

export function Title({ children }: BaseProps) {
  return <h1 className="text-xl font-semibold">{children}</h1>;
}

export function Description({ children }: BaseProps) {
  return <p className="mt-1 text-sm font-medium">{children}</p>;
}
