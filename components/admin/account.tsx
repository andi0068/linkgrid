import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';
import * as cardStyles from '@/styles/card';
import type { BaseProps, WithAsProp } from '@/types';

export function Root({ children }: BaseProps) {
  return <section className="space-y-6">{children}</section>;
}

export function Title({ children }: BaseProps) {
  return <h2 className="text-center text-[1.75rem] leading-[2.625rem]">{children}</h2>;
}

export const Section = {
  Root({ children }: BaseProps) {
    return <section className="space-y-2">{children}</section>;
  },

  Title({ children }: BaseProps) {
    return <h3 className="text-sm text-foreground-secondary">{children}</h3>;
  },
};

export const Card = {
  Root({ children }: BaseProps) {
    return <section className={cn(cardStyles.appearance, 'p-[1.125rem]')}>{children}</section>;
  },

  Title({ children }: BaseProps) {
    return <h4 className="mb-2 font-semibold">{children}</h4>;
  },

  Description({ children }: BaseProps) {
    return <p className="text-foreground-secondary">{children}</p>;
  },

  Footer({ children }: BaseProps) {
    return <footer className="flex flex-col mt-[1.125rem]">{children}</footer>;
  },
};

export const FormCard = {
  Content({ children }: BaseProps) {
    return <div className={cn(cardStyles.appearance, 'pb-[1.125rem]')}>{children}</div>;
  },

  Field: {
    Root({ children }: BaseProps) {
      return <div className="flex flex-col px-[1.125rem]">{children}</div>;
    },

    Label: forwardRef<HTMLLabelElement, React.ComponentPropsWithRef<'label'>>(
      ({ children, className, ...props }, ref) => (
        <label
          ref={ref}
          className={cn('pt-[1.125rem] text-xs text-foreground-secondary', className)}
          {...props}
        >
          {children}
        </label>
      ),
    ),

    Control: forwardRef<HTMLInputElement, WithAsProp<React.ComponentPropsWithRef<'input'>>>(
      ({ className, asChild, ...props }, ref) => {
        const Comp = asChild ? Slot : 'input';
        return (
          <Comp
            ref={ref}
            className={cn('pt-2 pb-[1.125rem] truncate leading-none', className)}
            {...props}
          />
        );
      },
    ),

    Description: forwardRef<HTMLParagraphElement, React.ComponentPropsWithRef<'p'>>(
      ({ children, className, ...props }, ref) => (
        <p ref={ref} className={cn('mt-2 text-xs text-foreground-tertiary', className)} {...props}>
          {children}
        </p>
      ),
    ),
  },

  ImageField: {
    Root({ children }: BaseProps) {
      return <div className="flex items-center p-[1.125rem] pb-0">{children}</div>;
    },

    Image({ children, asChild }: WithAsProp<BaseProps>) {
      const Comp = asChild ? Slot : 'img';
      return (
        <Comp width={96} height={96} className="shrink-0 object-cover w-24 h-24 rounded-full">
          {children}
        </Comp>
      );
    },

    Content({ children }: BaseProps) {
      return <div className="grow flex flex-col ml-4 space-y-2">{children}</div>;
    },
  },

  Footer({ children }: BaseProps) {
    return <div className="flex flex-col mt-2.5 space-y-2">{children}</div>;
  },
};
