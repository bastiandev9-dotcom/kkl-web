const base = import.meta.env.BASE_URL;

export function asset(path: string): string {
  if (/^(?:https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  const normalized = path.replace(/^\/+/, '');
  const prefix = base.replace(/\/+$/, '');

  return `${prefix}/${normalized}`;
}
