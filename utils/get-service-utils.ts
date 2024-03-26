export function all<T extends Record<string, any>>(value: Record<string, T> | null) {
  return value === null ? [] : Object.values(value);
}

export function first<T extends Record<string, any>>(value: Record<string, T> | null) {
  if (value === null) return null;

  let data: T | null = null;

  for (const key in value) {
    data = value[key];
    break;
  }

  return data;
}
