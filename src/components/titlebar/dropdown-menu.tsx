import { Menu } from 'lucide-react'
import React, { Fragment } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem as DropdownMenuItemPrimitive,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MENU } from '@/constants/menu'
import type { TitleBarMenuItem as DropdownMenuItemProps } from '@/types'
import { cn } from '@/lib/utils'

const TitleBarMenuDropDownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button tabIndex={-1}>
          <Menu />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {MENU.map((item) => (
          <DropdownMenuItem key={item.id} {...item} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = (props) => {
  if (props.type === 'separator') return <DropdownMenuSeparator />

  const { icon, label, submenu } = props

  const item = (
    <Fragment>
      {icon && React.createElement(icon, { className: 'w-4 h-4' })}
      <span className={cn('mx-4', !icon && 'ml-8 mr-4')}>{label}</span>
    </Fragment>
  )

  if (submenu)
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>{item}</DropdownMenuSubTrigger>
        {submenu && (
          <DropdownMenuSubContent>
            {submenu.map((item) => (
              <DropdownMenuItem key={item.id} {...item} />
            ))}
          </DropdownMenuSubContent>
        )}
      </DropdownMenuSub>
    )

  const command = label.toLowerCase().replace(' ', '')
  const handleInvokeCommand = () => window.ipcRenderer.send('invoke-menu-command', command)

  return <DropdownMenuItemPrimitive onClick={handleInvokeCommand}>{item}</DropdownMenuItemPrimitive>
}

export default TitleBarMenuDropDownMenu
