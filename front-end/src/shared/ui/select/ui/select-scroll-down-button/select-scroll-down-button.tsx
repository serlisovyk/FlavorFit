import { Select as SelectPrimitive } from 'radix-ui'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@shared/utils'
import { SelectScrollDownButtonProps } from '../../types'

export function SelectScrollDownButton({
  className,
  ...props
}: SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}
