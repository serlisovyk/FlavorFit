import { Heading } from '@shared/ui'
import { RecipeCarouselProps } from '../../types'

export function RecipeCarousel({ icon: Icon, title }: RecipeCarouselProps) {
  return (
    <div>
      <Heading Icon={Icon} level={2} className="mb-4">
        {title}
      </Heading>
      {/* Carousel */}
    </div>
  )
}
