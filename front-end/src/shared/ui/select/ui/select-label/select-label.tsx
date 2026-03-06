import { Select as SelectPrimitive } from 'radix-ui'
import { cn } from '@shared/utils'
import { SelectLabelProps } from '../../types'

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('px-2 py-1.5 text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}
