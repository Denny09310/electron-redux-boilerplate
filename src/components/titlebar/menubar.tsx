import React, { Fragment } from 'react'

import {
  MenubarContent,
  MenubarItem as MenubarItemPrimitive,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { cn } from '@/lib/utils'
import { TitleBarMenuItem as TitleBarMenuItemProps } from '@/types'

type Props = TitleBarMenuItemProps & { depth: number }

const MenuBarItem: React.FC<Props> = (props) => {
  if (props.type === 'separator') return <MenubarSeparator />

  const { icon, label, submenu, depth } = props

  const item = (
    <Fragment>
      {icon && React.createElement(icon, { className: 'w-4 h-4' })}
      <span className={cn('ml-4', !icon && 'ml-8')}>{label}</span>
    </Fragment>
  )

  if (depth < 1)
    return (
      <MenubarMenu>
        <MenubarTrigger>{item}</MenubarTrigger>
        {submenu && (
          <MenubarContent>
            {submenu.map((item) => (
              <MenuBarItem key={item.id} depth={depth + 1} {...item} />
            ))}
          </MenubarContent>
        )}
      </MenubarMenu>
    )

  if (submenu)
    return (
      <MenubarSub>
        <MenubarSubTrigger>{item}</MenubarSubTrigger>
        {submenu && (
          <MenubarSubContent>
            {submenu.map((item) => (
              <MenuBarItem key={item.id} depth={depth + 1} {...item} />
            ))}
          </MenubarSubContent>
        )}
      </MenubarSub>
    )

  const command = label.toLowerCase().replace(' ', '')
  const handleInvokeCommand = () => window.ipcRenderer.send('invoke-menu-command', command)

  return <MenubarItemPrimitive onClick={handleInvokeCommand}>{item}</MenubarItemPrimitive>
}

export default MenuBarItem
