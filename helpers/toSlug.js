export default function toSlug(name) {
  if (name) {
    const lowercased = name.toLowerCase()
    const normalized = lowercased.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const hyphenized = normalized.split(' ').join('-').toString();
    return hyphenized
  }
  return ""
}