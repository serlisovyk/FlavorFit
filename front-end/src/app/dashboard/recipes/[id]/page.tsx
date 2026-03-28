import { Metadata } from 'next'
import { RecipeDetails } from '@features/recipe'

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Recipe' }
}

export default function RecipePage() {
  return <RecipeDetails />
}
