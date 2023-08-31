import { createContext, useContext, useEffect } from "react"
import { useLocalStorageState } from "../hooks/useLocalStorageState"

const DarkModeContext = createContext()

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode")

  function toggleDarkMode() {
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode")
    } else {
      document.documentElement.classList.remove("dark-mode")
    }
  }, [isDarkMode])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode() {
  const context = useContext(DarkModeContext)

  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider")

  return context
}

export { DarkModeProvider, useDarkMode }
