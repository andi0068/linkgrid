import type { BaseProps } from '@/types';

export function Main({ children }: BaseProps) {
  return <main className="grow">{children}</main>;
}
