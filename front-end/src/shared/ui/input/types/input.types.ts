import { ComponentProps } from 'react'
import { FieldError } from 'react-hook-form'
import { LucideIcon } from 'lucide-react'

export interface InputProps extends ComponentProps<'input'> {
  error?: FieldError | undefined
  Icon?: LucideIcon
  label?: string
}
