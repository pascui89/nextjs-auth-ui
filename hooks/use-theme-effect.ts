"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function useThemeEffect(callback: (theme: string) => void) {
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    // Get the actual theme (accounting for system preference)
    const currentTheme = theme === "system" ? systemTheme : theme

    if (currentTheme) {
      callback(currentTheme)
    }
  }, [theme, systemTheme, callback])
}

