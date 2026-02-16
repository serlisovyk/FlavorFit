import { Slot } from 'radix-ui'
import { cn } from '@shared/utils'
import { buttonDefaultStyles, buttonVariant } from './constants'
import { ButtonProps } from './types'

export function Button({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Root : 'button'

  return (
    <Component
      data-slot="button"
      data-variant={variant}
      className={cn(buttonDefaultStyles, buttonVariant[variant], className)}
      {...props}
    />
  )
}
