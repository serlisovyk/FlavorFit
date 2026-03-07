import { cn } from '@shared/utils'
import { FieldAffixes } from './ui/field-affixes'
import { FieldItem } from './ui/field-item'
import { FieldError } from './ui/field-error'
import { FieldProps } from './types'

export function Field(props: FieldProps) {
  const { label, Icon, error, wrapperClassName, id } = props

  return (
    <div className={cn('relative', wrapperClassName)}>
      <FieldAffixes id={id} label={label} Icon={Icon} />

      <FieldItem componentProps={props} />

      <FieldError error={error} />
    </div>
  )
}
