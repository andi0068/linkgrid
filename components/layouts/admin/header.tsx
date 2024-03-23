import { cn } from '@/lib/utils';
import type { BaseProps } from '@/types';

interface HeaderProps extends BaseProps {
  /**
   * @default 'bottom'
   */
  border?: 'bottom' | 'none';
}

export function Root({ children, border = 'bottom' }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 bg-background/20 backdrop-blur-md',
        border === 'bottom' && 'border-b border-separator',
      )}
    >
      {children}
    </header>
  );
}

export function Content({ children }: BaseProps) {
  return <div className="flex items-center justify-between h-14">{children}</div>;
}

export function Title({ children }: BaseProps) {
  return <h1 className="select-none font-medium">{children}</h1>;
}
