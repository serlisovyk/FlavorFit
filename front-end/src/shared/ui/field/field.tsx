import { cn } from '@shared/utils'
import { FieldAffixes } from './ui/field-affixes'
import { FieldItem } from './ui/field-item'
import { FieldError } from './ui/field-error'
import { FieldProps } from './types'

export function Field(props: FieldProps) {
  const { label, icon, error, wrapperClassName, id, isShowLabel } = props

  return (
    <div className={cn('relative', wrapperClassName)}>
      <FieldAffixes
        id={id}
        label={label}
        icon={icon}
        isShowLabel={isShowLabel}
      />

      <FieldItem componentProps={props} />

      <FieldError error={error} />
    </div>
  )
}
