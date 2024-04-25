export function join(...paths: any[]) {
  return paths.filter(Boolean).join('');
}
