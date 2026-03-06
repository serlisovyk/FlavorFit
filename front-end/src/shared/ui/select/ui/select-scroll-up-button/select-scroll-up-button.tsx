import { Select as SelectPrimitive } from 'radix-ui'
import { ChevronUpIcon } from 'lucide-react'
import { cn } from '@shared/utils'
import { SelectScrollUpButtonProps } from '../../types'

export function SelectScrollUpButton({
  className,
  ...props
}: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}
