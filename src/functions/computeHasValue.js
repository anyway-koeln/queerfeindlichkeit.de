export default function computeHasValue(value, options) {
  const {
    min = -Infinity,
    max = Infinity
  } = options || {}

  console.log('value', value)
  console.log('options', options)

  let hasValue = false
  if (typeof value === 'object' && value instanceof Set && value.size > 0) {
    hasValue = true
  } else if (Array.isArray(value) && value.length > 0) {
    hasValue = true
  } else if ((typeof value === 'string' || value instanceof String) && value.length > 0) {
    hasValue = true
  } else if (typeof value === 'number' && !isNaN(value)) {
    if (value >= min && value <= max) {
      hasValue = true
    } else {
      hasValue = false
    }
  } else if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
    hasValue = true
  }
  return hasValue
}
