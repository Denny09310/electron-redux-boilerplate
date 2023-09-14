import type { PropsWithChildren } from 'react'
import React, { useEffect } from 'react'
import { useLocalStorage, useMedia } from 'react-use'

import type { Theme } from '@/contexts/theme-context'
import { ThemeContext } from '@/contexts/theme-context'

interface Props {
  defaultTheme?: Theme
  storageKey?: string
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  children,
}) => {
  const [theme, setTheme] = useLocalStorage(storageKey, defaultTheme, {
    raw: true,
  })
  const prefersDarkScheme = useMedia('(prefers-color-scheme: dark)')

  useEffect(() => {
    const toggleClass =
      (theme === 'system' && prefersDarkScheme) || theme === 'dark'
    const message = {
      payload: 'updateBackground',
      backgroundColor: toggleClass ? '#020817' : '#ffffff',
    }

    document.body.classList.toggle('dark', toggleClass)
    postMessage(message, '*')
  }, [prefersDarkScheme, theme])

  return (
    <ThemeContext.Provider value={{ setTheme, theme: theme ?? defaultTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
