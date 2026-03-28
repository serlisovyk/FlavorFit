import { FieldError as RHFFieldError } from 'react-hook-form'
import { LucideIcon } from 'lucide-react'
import { InputProps } from '../../input'
import { TextareaProps } from '../../textarea'
import { SelectProps } from '../../select'

export const FIELD_VARIANT = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SELECT: 'select',
} as const

export type FieldVariant = (typeof FIELD_VARIANT)[keyof typeof FIELD_VARIANT]

export interface InputFieldProps extends BaseFieldProps, InputProps {
  variant: typeof FIELD_VARIANT.INPUT
}

export interface TextareaFieldProps extends BaseFieldProps, TextareaProps {
  variant: typeof FIELD_VARIANT.TEXTAREA
}

export interface SelectFieldProps extends BaseFieldProps, SelectProps {
  variant: typeof FIELD_VARIANT.SELECT
}

export type FieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps

interface BaseFieldProps {
  label?: string
  isShowLabel?: boolean
  icon?: LucideIcon
  error?: RHFFieldError | undefined
  wrapperClassName?: string
}

export interface FieldItemProps {
  componentProps: FieldProps
}

export interface FieldAffixesProps {
  id?: string
  label?: string
  isShowLabel?: boolean
  icon?: LucideIcon
}

export interface FieldErrorProps {
  error?: RHFFieldError | undefined
}
