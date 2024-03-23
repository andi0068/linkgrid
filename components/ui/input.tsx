import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export interface InputOptions {
  /**
   * @default 'outline'
   */
  variant?: 'outline' | 'flush' | 'none';
  /**
   * @default 'default'
   */
  size?: 'default' | 'none';
}
export interface InputProps
  extends InputOptions,
    Omit<React.ComponentPropsWithRef<'input'>, 'size'> {
  asChild?: boolean;
}

const variants = cva(
  'w-full outline-none border-separator rounded-lg bg-transparent transition-[border-color,box-shadow] placeholder:text-foreground-secondary focus:border-accent',
  {
    variants: {
      variant: {
        outline: 'border hover:border-accent focus:ring focus:ring-accent/20',
        flush: 'border-b rounded-none',
        none: undefined,
      },
      size: {
        default: 'p-4 h-12 text-sm',
        none: undefined,
      },
    },
  },
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, asChild, variant = 'outline', size = 'default', ...props }, ref) => {
    const Comp = asChild ? Slot : 'input';
    return <Comp ref={ref} className={cn(variants({ variant, size, className }))} {...props} />;
  },
);

export default Input;
