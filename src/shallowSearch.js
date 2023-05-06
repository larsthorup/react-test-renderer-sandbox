export function byType(type, element) {
  if (element.type === type) return element;
  if (element.props && element.props.children) {
    for (let child of element.props.children) {
      const result = byType(type, child);
      if (result) return result;
    }
  }
  return null;
}
