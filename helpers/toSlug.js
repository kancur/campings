/**
 * 
 * @param {string} name string to convert to a slug
 * @returns {string} Slug generated from input string
 */
export default function toSlug(name) {
  if (name) {
    const lowercased = name.toLowerCase();
    const trimmed = lowercased.trim();
    const normalized = trimmed.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const hyphenized = normalized.replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    return hyphenized;
  }
  return '';
}
