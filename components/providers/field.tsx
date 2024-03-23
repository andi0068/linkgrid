'use client';
import { useId, useMemo, useContext, createContext } from 'react';

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
  const id = useId();

  const value = useMemo(() => {
    const labelId = `${id}--label`;
    const inputId = `${id}--input`;
    const descId = `${id}--desc`;
    const msgId = `${id}--msg`;

    return {
      labelProps: {
        id: labelId,
        htmlFor: inputId,
      },
      inputProps: {
        id: inputId,
        name,
        'aria-describedby': ariaDescribedBy([
          descriptionMounted && descId,
          messageMounted && msgId,
        ]),
      },
      descriptionProps: { id: descId },
      messageProps: { id: msgId },
    };
  }, [name, descriptionMounted, messageMounted, id]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const Consumer = Context.Consumer;

function ariaDescribedBy(values: any[]) {
  return values.filter(Boolean).join(' ') || undefined;
}

export { useFieldContext as useContext };
