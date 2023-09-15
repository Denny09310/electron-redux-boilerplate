import { useState } from 'react'
import { useEffectOnce } from 'react-use'

type UpdateWindowStateEvent = { maximized: boolean, fullscreen: boolean }

export default function useWindowSizeChanged() {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffectOnce(() => {
    window.ipcRenderer.addListener('window-size-changed', handleWindowSizeChanged)

    return () => {
      window.ipcRenderer.removeListener('window-size-changed', handleWindowSizeChanged)
    }
  })

  function handleWindowSizeChanged(_e: Electron.IpcRendererEvent, data: UpdateWindowStateEvent) {
    setIsMaximized(data.maximized)
    setIsFullScreen(data.fullscreen)
  }

  return { isFullScreen, isMaximized }
}
