import { LucideIcon } from 'lucide-react'

export interface SidebarAccordionProps {
  data: SidebarAccordionItem[]
}

export interface SidebarAccordionItemProps {
  item: SidebarAccordionItem
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
