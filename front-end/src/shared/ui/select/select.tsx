'use client'

import { SelectBase } from './ui/select-base'
import { SelectTrigger } from './ui/select-trigger'
import { SelectValue } from './ui/select-value'
import { SelectContent } from './ui/select-content'
import { SelectGroup } from './ui/select-group'
import { SelectLabel } from './ui/select-label'
import { SelectItem } from './ui/select-item'
import { SelectProps } from './types'

export function Select({
  value,
  onChange,
  placeholder,
  options,
  label,
  id,
  triggerClassName,
}: SelectProps) {
  return (
    <div>
      <SelectBase value={value || undefined} onValueChange={onChange}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent id={id}>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectBase>
    </div>
  )
}
