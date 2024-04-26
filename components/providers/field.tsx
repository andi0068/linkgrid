'use client';
import { useMemo, useContext, createContext } from 'react';

import { useIds } from '@/lib/hooks/use-id';

type ContextType = Readonly<{
  labelProps: {
    id: string;
    htmlFor: string;
  };
  inputProps: {
    id: string;
    name: string;
    'aria-describedby'?: string;
  };
  descriptionProps: {
    id: string;
  };
  messageProps: {
    id: string;
  };
}>;

interface ProviderProps {
  name: string;
  children?: React.ReactNode;
  descriptionMounted?: boolean;
  messageMounted?: boolean;
}

const Context = createContext({} as ContextType);

export function useFieldContext() {
  return useContext(Context);
}

export function Provider({ children, name, descriptionMounted, messageMounted }: ProviderProps) {
  const ids = useIds('label', 'input', 'desc', 'msg');

  const value = useMemo(
    () => ({
      labelProps: {
        id: ids.label,
        htmlFor: ids.input,
      },
      inputProps: {
        id: ids.input,
        name,
        'aria-describedby': ariaDescribedBy([
          descriptionMounted && ids.desc,
          messageMounted && ids.msg,
        ]),
      },
      descriptionProps: { id: ids.desc },
      messageProps: { id: ids.msg },
    }),
    [name, descriptionMounted, messageMounted, ids],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const Consumer = Context.Consumer;

function ariaDescribedBy(values: any[]) {
  return values.filter(Boolean).join(' ') || undefined;
}

export { useFieldContext as useContext };
