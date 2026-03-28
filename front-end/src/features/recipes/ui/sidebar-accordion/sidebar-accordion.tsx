import { SidebarAccordionItem } from '../sidebar-accordion-item'
import { SidebarAccordionProps } from '../../types'

export function SidebarAccordion({
  data,
  activeValue,
  onValueChange,
}: SidebarAccordionProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <SidebarAccordionItem
          key={item.name}
          item={item}
          activeValue={activeValue}
          onValueChange={onValueChange}
        />
      ))}
    </div>
  )
}
