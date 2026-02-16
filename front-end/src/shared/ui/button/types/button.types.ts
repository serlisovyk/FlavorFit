import { ComponentProps } from 'react'
import { buttonVariant } from '../constants'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
  asChild?: boolean
}

export type ButtonVariant = keyof typeof buttonVariant
