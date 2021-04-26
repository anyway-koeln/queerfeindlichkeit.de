export default function computeHasValue(value) {
  let hasValue = false
  if (typeof value === 'object' && value instanceof Set && value.size > 0) {
    hasValue = true
  } else if (Array.isArray(value) && value.length > 0) {
    hasValue = true
  } else if ((typeof value === 'string' || value instanceof String) && value.length > 0) {
    hasValue = true
  } else if (typeof value === 'number' && !isNaN(value)) {
    hasValue = true
  } else if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
    hasValue = true
  }
  return hasValue
}
