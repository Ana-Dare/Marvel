export function getIdFromUri(uri: string): string {
  const index = uri.lastIndexOf('/');
  return uri.substring(index + 1);
}