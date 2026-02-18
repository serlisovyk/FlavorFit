import {
  House,
  CalendarDays,
  Utensils,
  ChartColumn,
  Store,
  BookMarked,
  Users,
} from 'lucide-react'
import { ROUTES } from '@shared/config'
import { NavigationMenuItem } from '../types'

export const navigationMenuData: NavigationMenuItem[] = [
  {
    icon: House,
    text: 'Home',
    href: ROUTES.DASHBOARD,
  },
  {
    icon: CalendarDays,
    text: 'Meal Plans',
    href: ROUTES.MEAL_PLANS,
  },
  {
    icon: Utensils,
    text: 'Nutrition',
    href: ROUTES.NUTRITION,
  },
  {
    icon: ChartColumn,
    text: 'Analytics',
    href: ROUTES.ANALYTICS,
  },
  {
    icon: Store,
    text: 'Order Groceries',
    href: ROUTES.ORDER_GROCERIES,
  },
  {
    icon: BookMarked,
    text: 'Recipes',
    href: ROUTES.RECIPES,
  },
  {
    icon: Users,
    text: 'Forum',
    href: ROUTES.FORUM,
  },
]
