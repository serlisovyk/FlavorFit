import { Input } from '../../../input'
import { Select } from '../../../select'
import { Textarea } from '../../../textarea'
import { FIELD_VARIANT, FieldItemProps } from '../../types'

export function FieldItem({ componentProps }: FieldItemProps) {
  switch (componentProps.variant) {
    case FIELD_VARIANT.INPUT:
      return <Input {...componentProps} />

    case FIELD_VARIANT.TEXTAREA:
      return <Textarea {...componentProps} />

    case FIELD_VARIANT.SELECT:
      return <Select {...componentProps} />

    default:
      return null
  }
}
