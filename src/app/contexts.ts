import React from 'react'

export const ThemeContext = React.createContext<ThemeType>({
  theme: 'light',
  toggleTheme: () => { }
})
export type ThemeType = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
