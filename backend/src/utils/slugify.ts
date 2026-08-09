export function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/['\u2019\u2018.]/g, '')
    .replace(/[^\w\u0980-\u09FF]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || `item-${Math.random().toString(36).substring(2, 8)}`;
}
