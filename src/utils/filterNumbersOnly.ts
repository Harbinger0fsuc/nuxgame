export function filterNumbersOnly(value: string) {
  if (typeof value !== 'string') return ''
  return value.replace(/[a-zA-Z]/g, '') // Removes any character that is NOT a letter
}
