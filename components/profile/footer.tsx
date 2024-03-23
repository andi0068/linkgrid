import type { BaseProps } from '@/types';

export function Root({ children }: BaseProps) {
  return <footer className="py-8">{children}</footer>;
}

export function Content({ children }: BaseProps) {
  return <div className="text-center">{children}</div>;
}
