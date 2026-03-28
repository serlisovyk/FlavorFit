import { RecipeCarousel } from '@features/recipe-carousel'
import { BookHeart, Star } from 'lucide-react'

export function RecipesCatalog() {
  return (
    <div>
      <RecipeCarousel icon={BookHeart} title="Recommended" />
      <RecipeCarousel icon={Star} title="Popular" />
    </div>
  )
}
