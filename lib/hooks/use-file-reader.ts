import { useEffect } from 'react';

export interface UseReadAsDataURLProps {
  file?: File | null;
  onLoad?(url: string): void;
}

export function useReadAsDataURL(
  { file, onLoad: onLoadProp }: UseReadAsDataURLProps,
  deps: React.DependencyList,
) {
  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener('load', onLoad);
    reader.readAsDataURL(file);

    return () => {
      reader.removeEventListener('load', onLoad);
    };
  }, deps);

  function onLoad(ev: ProgressEvent<FileReader>) {
    const target = ev.target as FileReader;

    onLoadProp?.(target.result as string);
  }
}
