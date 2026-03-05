import { cn } from '@shared/utils'
import { SkeletonProps } from './types'

export function Skeleton({ count = 1, className }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'bg-gray-400/80 h-10 mb-2.5 animate-pulse rounded-xl last:mb-0',
            className,
          )}
        />
      ))}
    </>
  )
}
