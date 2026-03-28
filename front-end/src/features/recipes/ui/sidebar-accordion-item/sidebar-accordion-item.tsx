import { ChevronDown, CornerDownRight } from 'lucide-react'
import { cn } from '@shared/utils'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@shared/ui/collapsible'
import { SidebarAccordionItemProps } from '../../types'

export function SidebarAccordionItem({ item }: SidebarAccordionItemProps) {
  const { name, icon: Icon, items, isInitialOpen } = item

  return (
    <Collapsible defaultOpen={isInitialOpen}>
      <CollapsibleTrigger
        className={cn(
          'flex items-center justify-between w-full opacity-80 py-1.5 px-2 rounded-xl',
          { 'bg-accent': isInitialOpen },
        )}
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Icon size={22} />
          {name}
        </span>

        <ChevronDown size={20} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="pl-4 space-y-2 text-sm pt-2">
          {items.map(({ value, label, badgeValue }) => (
            <li key={value} className="opacity-50">
              <button
                type="button"
                className="flex items-center justify-between w-full"
              >
                <span className="flex items-center gap-1.5">
                  <CornerDownRight size={18} />
                  <span>{label}</span>
                </span>

                {badgeValue && (
                  <span className="rounded-xl bg-red-200 text-red-800 text-xs mr-2 block font-semibold p-0.5">
                    {badgeValue}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
