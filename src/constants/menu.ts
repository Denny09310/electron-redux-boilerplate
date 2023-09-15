import {
  Clipboard,
  Copy,
  Delete,
  Edit,
  Expand,
  LucideAppWindow,
  Maximize,
  Minimize,
  PenTool,
  Redo,
  RefreshCcw,
  RefreshCcwDot,
  Scissors,
  TextSelect,
  Undo,
  View,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

import { TitleBarMenuItem } from '@/types'

export const MENU: TitleBarMenuItem[] = [
  {
    id: 1,
    icon: Edit,
    type: 'item',
    label: 'Edit',
    submenu: [
      {
        id: 1.1,
        icon: Undo,
        type: 'item',
        label: 'Undo',
      },
      {
        id: 1.2,
        icon: Redo,
        type: 'item',
        label: 'Redo',
      },
      {
        id: 1.3,
        type: 'separator',
      },
      {
        id: 1.4,
        icon: Scissors,
        type: 'item',
        label: 'Cut',
      },
      {
        id: 1.5,
        icon: Copy,
        type: 'item',
        label: 'Copy',
      },
      {
        id: 1.6,
        icon: Clipboard,
        type: 'item',
        label: 'Paste',
      },
      {
        id: 1.7,
        icon: Delete,
        type: 'item',
        label: 'Delete',
      },
      { id: 1.8, type: 'separator' },
      {
        id: 1.9,
        icon: TextSelect,
        type: 'item',
        label: 'Select All',
      },
    ],
  },
  {
    id: 2,
    icon: View,
    type: 'item',
    label: 'View',
    submenu: [
      {
        id: 2.1,
        icon: RefreshCcw,
        type: 'item',
        label: 'Reload',
      },
      {
        id: 2.2,
        icon: RefreshCcwDot,
        type: 'item',
        label: 'Force Reload',
      },
      {
        id: 2.3,
        icon: PenTool,
        type: 'item',
        label: 'Toggle DevTools',
      },
      {
        id: 2.4,
        type: 'separator',
      },
      {
        id: 2.5,
        icon: ZoomIn,
        type: 'item',
        label: 'Zoom In',
      },
      {
        id: 2.6,
        icon: ZoomOut,
        type: 'item',
        label: 'Zoom Out',
      },
      {
        id: 2.7,
        type: 'separator',
      },
      {
        id: 2.8,
        icon: Expand,
        type: 'item',
        label: 'Toggle Fullscreen',
      },
    ],
  },
  {
    id: 3,
    icon: LucideAppWindow,
    type: 'item',
    label: 'Window',
    submenu: [
      {
        id: 3.1,
        icon: Minimize,
        type: 'item',
        label: 'Minimize',
      },
      {
        id: 3.2,
        icon: Maximize,
        type: 'item',
        label: 'Maximize',
      },
      {
        id: 3.3,
        icon: X,
        type: 'item',
        label: 'Close',
      },
    ],
  },
]
