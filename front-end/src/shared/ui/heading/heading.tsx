import { ElementType } from 'react'
import { cn } from '@shared/utils'
import { HeadingProps } from './types'

export function Heading({
  Icon,
  level = 2,
  children,
  className,
}: HeadingProps) {
  const Tag = `h${level}` as ElementType

  return (
    <div className="flex items-center gap-1.5">
      {Icon && <Icon className="opacity-60" />}

      <Tag className={cn('text-lg text-[#222222] font-semibold', className)}>
        {children}
      </Tag>
    </div>
  )
}
