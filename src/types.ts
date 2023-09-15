import { LucideIcon } from 'lucide-react'

export type TitleBarMenuItem = (
  | {
      type: 'item'
      label: string
      icon?: LucideIcon
      submenu?: TitleBarMenuItem[]
    }
  | {
      type: 'separator'
    }
) & { id: number }
