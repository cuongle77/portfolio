import { useContext } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ThemeProviderContext } from '~/components/theme-provider'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}