import { LucideIcon } from 'lucide-react'

export interface RecipesSidebarProps {
  searchTerm: string
  filter: string
  setSearchTerm: (term: string) => void
  setFilter: (filter: string) => void
}

export interface SidebarAccordionProps {
  data: SidebarAccordionItem[]
  activeValue?: string
  onValueChange?: (value: string) => void
}

export interface SidebarAccordionItemProps {
  item: SidebarAccordionItem
  activeValue?: string
  onValueChange?: (value: string) => void
}

export interface SidebarAccordionItem {
  name: string
  icon: LucideIcon
  items: SidebarAccordionSubItem[]
  isInitialOpen?: boolean
}

interface SidebarAccordionSubItem {
  value: string
  label: string
  badgeValue?: string
}
