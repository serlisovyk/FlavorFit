import { Select as SelectPrimitive } from 'radix-ui'
import { SelectBaseProps } from '../../types'

export function SelectBase({ ...props }: SelectBaseProps) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}
