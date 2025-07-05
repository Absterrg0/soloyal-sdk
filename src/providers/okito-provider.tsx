"use client"

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react"
import { clusterApiUrl, Cluster } from "@solana/web3.js"
import * as React from "react"
import type { OkitoConfig, OkitoResolvedConfig } from "../types/okito.config.types"
import { validateAndResolveOkitoConfig } from "../logic/config"
import QueryProvider from "./query-provider"
import clsx from "clsx"
import { createContext } from "react"

const OkitoConfigContext = createContext<OkitoResolvedConfig | null>(null)

const ThemeContext = React.createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  systemTheme: "light" | "dark";
} | null>(null)

export default function OkitoProvider({
  children,
  config,
  theme,
}: {
  children: React.ReactNode
  config: OkitoConfig
  theme?: "light" | "dark" | "system"
}) {
  const endpoint = clusterApiUrl(config.network as Cluster)
  const resolvedConfig = React.useMemo(() => validateAndResolveOkitoConfig(config), [config])
  
  // System theme detection
  const [systemTheme, setSystemTheme] = React.useState<"light" | "dark">("dark")
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light")
    }
    
    // Set initial theme
    updateSystemTheme()
    
    // Listen for changes
    mediaQuery.addEventListener("change", updateSystemTheme)
    
    return () => mediaQuery.removeEventListener("change", updateSystemTheme)
  }, [])
  
  // Determine current theme based on prop and system preference
  const [manualTheme, setManualTheme] = React.useState<"light" | "dark" | null>(
    theme && theme !== "system" ? theme : null
  )
  
  const currentTheme = manualTheme || systemTheme
  
  const setTheme = React.useCallback((newTheme: "light" | "dark") => {
    setManualTheme(newTheme)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <OkitoConfigContext.Provider value={resolvedConfig}>
          <QueryProvider>
            <ThemeContext.Provider value={{ 
              theme: currentTheme, 
              setTheme,
              systemTheme 
            }}>
              <div className={clsx(currentTheme === "dark" && "dark")}>
                {children}
              </div>
            </ThemeContext.Provider>
          </QueryProvider>
        </OkitoConfigContext.Provider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export function useOkitoConfig(): OkitoResolvedConfig {
  const ctx = React.useContext(OkitoConfigContext)
  if (!ctx) throw new Error("useOkitoConfig must be used within a OkitoProvider")
  return ctx
}

export function useOkitoTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useOkitoTheme must be used inside <OkitoProvider>")
  return ctx
}
