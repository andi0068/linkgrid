import { clsx } from 'clsx';

export function ariaCurrent(
  condition?: boolean,
  value?: boolean | 'page' | 'time' | 'false' | 'true' | 'step' | 'location' | 'date',
) {
  return condition && value && value !== 'false' ? value : undefined;
}

export function ariaDescribedBy(...inputs: any[]) {
  return clsx(...inputs);
}
