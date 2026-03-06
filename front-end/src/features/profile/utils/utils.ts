export function setValueAsNumber(value: string) {
  return value === '' ? undefined : Number(value)
}
