import type { BaseProps } from '@/types';

export function Root({ children }: BaseProps) {
  return <section className="text-center">{children}</section>;
}

export function Header({ children }: BaseProps) {
  return <header className="my-6">{children}</header>;
}

export function Title({ children }: BaseProps) {
  return <h2 className="mb-3 text-[1.75rem] leading-9 font-medium">{children}</h2>;
}

export function Description({ children }: BaseProps) {
  return <p className="mt-2 text-sm text-foreground-secondary">{children}</p>;
}

export function Footer({ children }: BaseProps) {
  return <footer className="flex flex-col mt-2">{children}</footer>;
}

export function FootCopy({ children }: BaseProps) {
  return <p className="mt-3 text-sm text-foreground-secondary">{children}</p>;
}
