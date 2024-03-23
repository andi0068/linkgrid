import Link from 'next/link';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';
import * as cardStyles from '@/styles/card';
import type { BaseProps, WithAsProp } from '@/types';

interface CardItemProps extends BaseProps {
  href: string;
  icon: React.ReactElement;
}

export function Root({ children }: BaseProps) {
  return <section className="space-y-6">{children}</section>;
}

export const Header = {
  Root({ children }: BaseProps) {
    return (
      <header
        className={cn(
          cardStyles.appearance,
          'flex items-center p-[1.125rem] rounded-3xl space-x-4',
        )}
      >
        {children}
      </header>
    );
  },

  Image({ children, asChild }: WithAsProp<BaseProps>) {
    const Comp = asChild ? Slot : 'img';
    return (
      <Comp width={48} height={48} className="shrink-0 object-cover w-12 h-12 rounded-full">
        {children}
      </Comp>
    );
  },

  Content({ children }: BaseProps) {
    return <div className="space-y-0.5">{children}</div>;
  },

  Title({ children }: BaseProps) {
    return <h2 className="font-medium">{children}</h2>;
  },

  Description({ children }: BaseProps) {
    return <p className="text-xs leading-[1.125rem] text-foreground-secondary">{children}</p>;
  },
};

export const Card = {
  Root({ children }: BaseProps) {
    return <section>{children}</section>;
  },

  Title({ children }: BaseProps) {
    return <h3 className="mb-2 text-sm text-foreground-secondary">{children}</h3>;
  },

  List({ children }: BaseProps) {
    return <ul className={cn(cardStyles.appearance, 'overflow-x-hidden')}>{children}</ul>;
  },

  Item({ children, href, icon }: CardItemProps) {
    return (
      <li className="group">
        <Link
          href={href}
          className="flex items-center p-[1.125rem] space-x-4 active:bg-background-tertiary"
        >
          <Icon asChild className="text-xl">
            {icon}
          </Icon>
          <span className="text-sm leading-[1.125rem]">{children}</span>
        </Link>
        <div className="my-0.5 mx-[1.125rem] border-t border-separator group-last-of-type:hidden" />
      </li>
    );
  },
};
