import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { FiEdit2 } from 'react-icons/fi';

import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';
import * as cardStyles from '@/styles/card';
import type { BaseProps, WithClassProp, WithAsProp } from '@/types';

export function Root({ children }: BaseProps) {
  return <section className="space-y-6">{children}</section>;
}

export function Header({ children }: BaseProps) {
  return <header className="flex flex-col">{children}</header>;
}

export function Title({ children }: BaseProps) {
  return <h2 className="sr-only">{children}</h2>;
}

export const List = forwardRef<HTMLOListElement, React.ComponentPropsWithRef<'ol'>>(
  ({ children, className, ...props }, ref) => (
    <ol ref={ref} className={cn('space-y-2', className)} {...props}>
      {children}
    </ol>
  ),
);

export const Item = {
  Root: forwardRef<HTMLLIElement, React.ComponentPropsWithRef<'li'>>(
    ({ children, className, ...props }, ref) => (
      <li
        ref={ref}
        className={cn(cardStyles.appearance, 'overflow-x-hidden flex rounded-3xl', className)}
        {...props}
      >
        {children}
      </li>
    ),
  ),

  SideIcon({ children, className }: WithClassProp<BaseProps>) {
    return (
      <div className={cn('shrink-0 inline-flex items-center justify-center w-12', className)}>
        {children}
      </div>
    );
  },

  Form({ children, asChild }: WithAsProp<BaseProps>) {
    const Comp = asChild ? Slot : 'div';
    return <Comp className="grow py-6 px-3 space-y-2">{children}</Comp>;
  },

  Field: {
    Root({ children }: BaseProps) {
      return <div className="group relative">{children}</div>;
    },

    Control: forwardRef<HTMLInputElement, WithAsProp<React.ComponentPropsWithRef<'input'>>>(
      ({ className, asChild, ...props }, ref) => {
        const Comp = asChild ? Slot : 'input';
        return (
          <Comp
            ref={ref}
            className={cn('relative z-10 pr-[1.375rem] h-6 truncate text-sm focus:pr-0', className)}
            {...props}
          />
        );
      },
    ),

    RightIcon() {
      return (
        <Icon asChild className="absolute top-1 right-0 text-sm group-focus-within:hidden">
          <FiEdit2 />
        </Icon>
      );
    },
  },
};
