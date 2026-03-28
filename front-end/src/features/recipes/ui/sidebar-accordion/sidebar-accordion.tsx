import { SidebarAccordionItem } from '../sidebar-accordion-item'
import { SidebarAccordionProps } from '../../types'

export function SidebarAccordion({ data }: SidebarAccordionProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <SidebarAccordionItem key={item.name} item={item} />
      ))}
    </div>
  )
}
