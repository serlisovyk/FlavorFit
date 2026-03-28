import { Apple, ChefHat, CookingPot, MonitorCog, Pill } from 'lucide-react'
import { SidebarAccordionItem } from '../types'

export const recipesSidebarItems: SidebarAccordionItem[] = [
  {
    name: 'Meal Type',
    icon: CookingPot,
    isInitialOpen: true,
    items: [
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'lunch', label: 'Lunch', badgeValue: '+1' },
      { value: 'dinner', label: 'Dinner' },
      { value: 'snack', label: 'Snack' },
      { value: 'dessert', label: 'Dessert' },
      { value: 'drinks', label: 'Drinks' },
    ],
  },
  {
    name: 'Dietary Preferences',
    icon: Apple,
    isInitialOpen: true,
    items: [
      { value: 'vegetarian', label: 'Vegetarian' },
      { value: 'low-carb', label: 'Low-Carb', badgeValue: '+2' },
      { value: 'gluten-free', label: 'Gluten-Free' },
      { value: 'keto', label: 'Keto' },
      { value: 'dairy-free', label: 'Dairy-Free' },
    ],
  },
  {
    name: 'Health Goals',
    icon: Pill,
    items: [
      { value: 'weight-loss', label: 'Weight Loss' },
      { value: 'muscle-gain', label: 'Muscle Gain' },
      { value: 'heart-health', label: 'Heart Health' },
    ],
  },
  {
    name: 'Cuisine',
    icon: ChefHat,
    items: [
      { value: 'italian', label: 'Italian' },
      { value: 'chinese', label: 'Chinese' },
      { value: 'mexican', label: 'Mexican' },
      { value: 'indian', label: 'Indian' },
      { value: 'french', label: 'French' },
    ],
  },
  {
    name: 'Special Occasions',
    icon: MonitorCog,
    items: [
      { value: 'holiday', label: 'Holiday' },
      { value: 'birthday', label: 'Birthday' },
      { value: 'anniversary', label: 'Anniversary' },
      { value: 'party', label: 'Party' },
    ],
  },
]
