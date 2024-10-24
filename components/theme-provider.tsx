"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/**
 * ThemeProvider Component
 * 
 * This component wraps the application with NextThemesProvider to enable theme switching functionality.
 * It uses the next-themes library to manage themes across the application.
 * 
 * @param {ThemeProviderProps} props - The props for the ThemeProvider component
 * @param {React.ReactNode} props.children - The child components to be wrapped
 * @param {...ThemeProviderProps} props - Additional props to be passed to NextThemesProvider
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Customization options:

// 1. Set default theme
// You can set a default theme by passing it as a prop:
// <ThemeProvider defaultTheme="light">
//   {children}
// </ThemeProvider>

// 2. Specify available themes
// Define the themes that users can switch between:
// <ThemeProvider themes={['light', 'dark', 'system']}>
//   {children}
// </ThemeProvider>

// 3. Force a specific theme
// Override user preferences and force a specific theme:
// <ThemeProvider forcedTheme="dark">
//   {children}
// </ThemeProvider>

// 4. Disable system theme
// Prevent the use of the system theme:
// <ThemeProvider disableSystemTheme>
//   {children}
// </ThemeProvider>

// 5. Custom attribute name
// Change the attribute used for theme switching (default is 'data-theme'):
// <ThemeProvider attribute="class">
//   {children}
// </ThemeProvider>

// 6. Enable local storage
// Store the user's theme preference in local storage:
// <ThemeProvider enableSystem={true} enableColorScheme={true}>
//   {children}
// </ThemeProvider>

// Usage example in your main layout or app component:
// import { ThemeProvider } from "./components/theme-provider"
//
// export default function App({ Component, pageProps }) {
//   return (
//     <ThemeProvider defaultTheme="system" enableSystem={true}>
//       <Component {...pageProps} />
//     </ThemeProvider>
//   )
// }

// To switch themes in your components, use the useTheme hook:
// import { useTheme } from "next-themes"
//
// function ThemeSwitcher() {
//   const { theme, setTheme } = useTheme()
//
//   return (
//     <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
//       Toggle theme
//     </button>
//   )
// }
