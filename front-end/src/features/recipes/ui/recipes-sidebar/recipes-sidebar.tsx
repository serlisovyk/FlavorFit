'use client'

import { Search } from 'lucide-react'
import { Field, FIELD_VARIANT } from '@shared/ui'
import { recipesSidebarItems } from '../../data'
import { SidebarAccordion } from '../sidebar-accordion'

export function RecipesSidebar() {
  return (
    <div className="w-full max-w-64 space-y-6 bg-white shadow-2xl p-4 rounded-xl">
      <Field
        variant={FIELD_VARIANT.INPUT}
        id="search"
        type="text"
        placeholder="Search by recipes..."
        className="bg-gray-300"
        icon={Search}
      />

      <SidebarAccordion data={recipesSidebarItems} />
    </div>
  )
}
