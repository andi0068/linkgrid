import { useState, useCallback, useRef } from 'react';

import useUniqueKey from './use-unique-key';
import { useReadAsDataURL } from './use-file-reader';

type State = Readonly<{
  src: string;
  file?: File;
  error?: string;
}>;

type ElementProps = {
  files?: FileList | null;
  click(): void;
};

interface RulesOptions {
  /**
   * @default 'image/'
   */
  typeStartsWith?: string;
  /**
   * @default 999999
   */
  maxSize?: number;
}
interface MessagesOptions {
  type?: string;
  size?: string;
}

export interface UseInputImageProps {
  defaultSrc?: string;
  rules?: RulesOptions;
  messages?: MessagesOptions;
}

export default function useInputImage<T extends ElementProps = HTMLInputElement>({
  defaultSrc = '',
  rules,
  messages,
}: UseInputImageProps) {
  const [state, dispatch] = useState<State>({ src: defaultSrc });

  const ref = useRef<T>(null);
  const uniqueKey = useUniqueKey();

  const onChange: React.ChangeEventHandler<T> = useCallback((ev) => {
    const target = ev.target as T;
    const file = target.files?.[0];

    if (!file) return;

    try {
      validate(file);
      dispatch((s) => ({
        ...s,
        file,
        error: undefined,
      }));
    } catch (err) {
      uniqueKey.regenerate();
      dispatch({
        src: defaultSrc,
        file: undefined,
        error: err as string,
      });
    }
  }, []);

  const onTrigger = useCallback(() => ref.current?.click(), []);

  useReadAsDataURL(
    {
      file: state.file,
      onLoad(url) {
        dispatch((s) => ({ ...s, src: url }));
      },
    },
    [state.file],
  );

  function validate(file: File) {
    const r = getRules(rules);
    const m = getMessages(messages);

    if (!file.type.startsWith(r.typeStartsWith)) {
      throw m.type;
    }

    if (file.size > r.maxSize) {
      throw m.size;
    }
  }

  return {
    key: uniqueKey.value,
    ref,
    onChange,
    onTrigger,
    state,
  } as const;
}

function getRules({ typeStartsWith = 'image/', maxSize = 999999 }: RulesOptions = {}) {
  return {
    typeStartsWith,
    maxSize,
  } as const;
}

function getMessages({
  type = `The file format is not supported. Please select a file with a compatible format.`,
  size = `The file size exceeds the maximum allowed limit.`,
}: MessagesOptions = {}) {
  return {
    type,
    size,
  } as const;
}
