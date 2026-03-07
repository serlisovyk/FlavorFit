import { FieldErrorProps } from '../../types'

export function FieldError({ error }: FieldErrorProps) {
  if (!error) return null

  return <p className="text-destructive text-sm block mt-1">{error.message}</p>
}
