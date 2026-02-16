import { ComponentProps } from 'react'
import { FieldError } from 'react-hook-form'

export interface InputProps extends ComponentProps<'input'> {
  error?: FieldError | undefined
  label?: string
  labelClassName?: string
}
