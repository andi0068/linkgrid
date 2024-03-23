import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export interface ButtonOptions {
  /**
   * @default 'fill'
   */
  variant?: 'fill' | 'outline' | 'none';
  /**
   * @default 'default'
   */
  size?: 'default' | 'xs' | 'lg' | 'xl' | 'none';
  /**
   * @default 'default'
   */
  color?: 'default' | 'accent' | 'danger' | 'secondary';
  /**
   * @default 'accent'
   */
  bg?: 'accent' | 'secondary' | 'tertiary';
}
export interface ButtonProps
  extends ButtonOptions,
    Omit<React.ComponentPropsWithRef<'button'>, 'color'> {
  as?: React.ElementType;
  asChild?: boolean;
}

const variants = cva(
  'inline-flex items-center justify-center whitespace-nowrap select-none font-medium outline-none rounded-lg transition-shadow focus-visible:ring focus-visible:ring-offset-[3px] focus-visible:ring-accent/20 active:opacity-60',
  {
    variants: {
      variant: {
        fill: undefined,
        outline: 'border border-current',
        none: undefined,
      },
      size: {
        default: 'px-4 h-10 text-base',
        xs: 'px-2 h-7 text-sm',
        lg: 'px-4 h-12 text-base',
        xl: 'px-4 h-[3.75rem] text-base',
        none: undefined,
      },
      color: {
        default: 'border-separator',
        accent: 'text-foreground-accent',
        danger: 'text-foreground-danger',
        secondary: 'text-foreground-secondary',
      },
      bg: {
        accent: 'text-white bg-background-accent',
        secondary: 'bg-background-secondary',
        tertiary: 'bg-background-tertiary',
      },
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      as = 'button',
      asChild,
      variant = 'fill',
      size = 'default',
      color = 'default',
      bg = 'accent',
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : as;

    const variantPropsMap = {
      fill: { variant, size, color, bg, className },
      outline: { variant, size, color, className },
      none: { size, color, className },
    } as const;

    return (
      <Comp ref={ref} className={cn(variants(variantPropsMap[variant]))} {...props}>
        {children}
      </Comp>
    );
  },
);

export default Button;
