export async function writeText(data: string) {
  if (!('clipboard' in window.navigator)) return;
  return window.navigator.clipboard.writeText(data);
}
