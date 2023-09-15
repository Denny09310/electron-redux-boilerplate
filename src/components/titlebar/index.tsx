import { Maximize2, Minimize2, Minus, X } from 'lucide-react'
import React from 'react'
import { useWindowSize } from 'react-use'

import { Menubar } from '@/components/ui/menubar'
import { MENU } from '@/constants/menu'
import useWindowSizeChanged from '@/hooks/useWindowSizeChanged'

import TitleBarControlButton from './control-button'
import TitleBarMenuDropDownMenu from './dropdown-menu'
import MenuBarItem from './menubar'

const favicon = document.head.querySelector('link[rel=icon]')?.getAttribute('href')

interface Props {
  showTitle?: boolean
  showIcon?: boolean
}

const TitleBar: React.FC<Props> = ({ showIcon = true, showTitle = true }) => {
  return (
    <header id="title-bar">
      <div id="drag-region">
        <div id="window-title">
          {showIcon && favicon && <img src={favicon} className="h-4 w-4" />}
          {showTitle && <span>Electron quick start</span>}
        </div>

        <div id="menu">
          <TitleBarMenu />
        </div>

        <TitleBarControls />
      </div>
    </header>
  )
}

const TitleBarMenu = () => {
  const { width } = useWindowSize()

  if (width >= 1024)
    return (
      <Menubar className="border-none">
        {MENU.map((item) => (
          <MenuBarItem key={item.id} depth={0} {...item} />
        ))}
      </Menubar>
    )

  return <TitleBarMenuDropDownMenu />
}

const TitleBarControls = () => {
  const { isMaximized, isFullScreen } = useWindowSizeChanged()

  if (isFullScreen) return null

  return (
    <div id="window-controls">
      <TitleBarControlButton col={1} icon={Minus} channel="minimize" />
      <TitleBarControlButton
        col={2}
        icon={isMaximized ? Minimize2 : Maximize2}
        channel="maximize"
      />
      <TitleBarControlButton col={3} icon={X} variant="destructive" channel="close" />
    </div>
  )
}

export default TitleBar
