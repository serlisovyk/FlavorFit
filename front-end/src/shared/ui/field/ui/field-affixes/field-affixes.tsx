import { cn } from '@shared/utils'
import { FieldAffixesProps } from '../../types'

export function FieldAffixes({
  id,
  label,
  isShowLabel,
  icon: Icon,
}: FieldAffixesProps) {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-sm mb-1.5 block opacity-70',
            !isShowLabel && 'sr-only',
          )}
        >
          {label}
        </label>
      )}

      {Icon && (
        <Icon
          size={16}
          className="absolute bottom-2.5 left-3 opacity-50 z-10"
        />
      )}
    </>
  )
}
