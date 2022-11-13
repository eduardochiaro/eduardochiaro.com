export default function mergeObj(a, b) {
  for (var key in b) {
    if (key in a) {
      a[key] = typeof a[key] === 'object' && typeof b[key] === 'object' ? mergeObj(a[key], b[key]) : b[key];
    }
  }
  return a;
}
