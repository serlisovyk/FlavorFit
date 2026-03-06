import { Select as SelectPrimitive } from 'radix-ui'
import { SelectValueProps } from '../../types'

export function SelectValue({ ...props }: SelectValueProps) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}
