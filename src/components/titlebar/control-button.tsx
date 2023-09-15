import { LucideIcon } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

type TitleBarControlChannels = 'minimize' | 'maximize' | 'close'

interface Props {
  col: number
  icon: LucideIcon
  variant?: 'default' | 'destructive'
  channel: TitleBarControlChannels
}

const TitleBarControlButton: React.FC<Props> = ({ col, icon, variant = 'default', channel }) => {
  const handleOnClick = (channel: TitleBarControlChannels) => () =>
    window.ipcRenderer.send(`${channel}-window`)
  return (
    <button
      tabIndex={-1}
      className={cn(
        'flex h-full w-full items-center justify-center hover:bg-white/10 active:bg-white/20',
        variant === 'destructive' && 'hover:bg-red-500/75 active:bg-red-500/50',
      )}
      style={{ gridRow: '1 / span 1', gridColumn: col }}
      onClick={handleOnClick(channel)}
    >
      {React.createElement(icon, { className: 'w-4 h-4' })}
    </button>
  )
}

export default TitleBarControlButton
