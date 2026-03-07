export function setValueAsNumber(value: string) {
  return value === '' ? undefined : Number(value)
}

export function omitTypename<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => key !== '__typename'),
  )
}
