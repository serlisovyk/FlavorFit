import { Skeleton } from '@shared/ui'

export function ProfileSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Skeleton count={1} className="w-xs mb-0" />

        <div className="flex items-center gap-2">
          <Skeleton count={2} className="w-32 mb-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <Skeleton count={4} className="mb-4" />
        <Skeleton count={6} className="mb-4" />
      </div>
    </div>
  )
}
