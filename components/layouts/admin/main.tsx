import type { BaseProps } from '@/types';

export function Main({ children }: BaseProps) {
  return (
    <>
      <main className="grow my-6">{children}</main>
      <div className="h-16" />
    </>
  );
}
