import { cn } from '@/lib/utils';

export function Anchor({
  children,
  className,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center justify-center py-4 px-11 font-medium border-2 border-background-tertiary bg-background-tertiary transition-colors hover:bg-transparent',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
