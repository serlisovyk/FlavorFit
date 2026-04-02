'use client'

import { useQueryState } from 'nuqs'
import { useDebounce } from '@shared/hooks'
import { RecipesSidebar } from '../recipes-sidebar'
import { RecipesBanners } from '../recipes-banners'
import { RecipesCatalog } from '../recipes-catalog'

export function Recipes() {
  const [searchTerm, setSearchTerm] = useQueryState('q', { defaultValue: '' })
  const [filter, setFilter] = useQueryState('f', { defaultValue: '' })

  const debouncedSetSearchTerm = useDebounce(searchTerm, 400)

  return (
    <div className="grid grid-cols-[1fr_4.5fr] gap-5">
      <RecipesSidebar
        searchTerm={searchTerm}
        filter={filter}
        setSearchTerm={setSearchTerm}
        setFilter={setFilter}
      />

      <div>
        <RecipesBanners />
        <RecipesCatalog />
      </div>
    </div>
  )
}
