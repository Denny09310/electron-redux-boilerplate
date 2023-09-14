import { createContext, useContext } from 'react'

export type Theme = 'system' | 'light' | 'dark'

interface ThemeContextState {
  setTheme: (theme: Theme) => void
  theme: Theme
}

const initialValues: ThemeContextState = {
  setTheme: () => null,
  theme: 'system',
}

export const ThemeContext = createContext(initialValues)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside a ThemeProvider')
  return context
}
