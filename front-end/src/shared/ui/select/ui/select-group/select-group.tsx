import { Select as SelectPrimitive } from 'radix-ui'
import { SelectGroupProps } from '../../types'

export function SelectGroup({ ...props }: SelectGroupProps) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}
