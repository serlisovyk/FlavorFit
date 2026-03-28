import { Metadata } from 'next'
import { Recipes } from '@features/recipes'
import { NO_INDEX_PAGE_METADATA } from '@shared/constants'

export const metadata: Metadata = {
  title: 'Recipes',
  ...NO_INDEX_PAGE_METADATA,
}

export default function RecipesPage() {
  return <Recipes />
}
