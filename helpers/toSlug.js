export default function toSlug(name) {
  if (name) {
    const lowercased = name.toLowerCase();
    const trimmed = lowercased.trim();
    const normalized = trimmed
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const hyphenized = normalized.replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    return hyphenized;
  }
  return '';
}

