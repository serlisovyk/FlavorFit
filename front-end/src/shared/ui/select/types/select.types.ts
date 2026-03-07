import { ComponentProps } from 'react'
import { Select as RadixSelect } from 'radix-ui'

export type SelectBaseProps = ComponentProps<typeof RadixSelect.Root>
export type SelectGroupProps = ComponentProps<typeof RadixSelect.Group>
export type SelectValueProps = ComponentProps<typeof RadixSelect.Value>

export type SelectContentProps = ComponentProps<typeof RadixSelect.Content>
export type SelectLabelProps = ComponentProps<typeof RadixSelect.Label>
export type SelectItemProps = ComponentProps<typeof RadixSelect.Item>

export type SelectTriggerProps = ComponentProps<typeof RadixSelect.Trigger> &
  SelectTriggerSize

export type SelectScrollUpButtonProps = ComponentProps<
  typeof RadixSelect.ScrollUpButton
>

export type SelectScrollDownButtonProps = ComponentProps<
  typeof RadixSelect.ScrollDownButton
>

interface SelectTriggerSize {
  size?: 'sm' | 'default'
}

export interface SelectProps {
  value: string | undefined | null
  onChange: (value: string | undefined | null) => void
  id: string
  options: SelectOption[]
  label?: string
  placeholder?: string
  triggerClassName?: string
}

interface SelectOption {
  value: string
  label: string
}
