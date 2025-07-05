"use client"

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react"
import { clusterApiUrl, Cluster } from "@solana/web3.js"
import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react"
import type { OkitoConfig, OkitoResolvedConfig } from "../types/okito.config.types"
import { validateAndResolveOkitoConfig } from "../logic/config"
import QueryProvider from "./query-provider"
import clsx from "clsx"


const OkitoConfigContext = createContext<OkitoResolvedConfig | null>(null)

export default function OkitoProvider({
  children,
  config,
  theme = "dark",
}: {
  children: React.ReactNode
  config: OkitoConfig
  theme?: "light" | "dark" 
}) {
  const endpoint = clusterApiUrl(config.network as Cluster)
  const resolvedConfig = useMemo(() => validateAndResolveOkitoConfig(config), [config])
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(theme)

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <OkitoConfigContext.Provider value={resolvedConfig}>
          <QueryProvider>
            <ThemeContext.Provider value={{ theme: currentTheme, setTheme: setCurrentTheme }}>
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
  const ctx = useContext(OkitoConfigContext)
  if (!ctx) throw new Error("useOkitoConfig must be used within a OkitoProvider")
  return ctx
}


const ThemeContext = createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
} | null>(null)

export function useOkitoTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useOkitoTheme must be used inside <OkitoProvider>")
  return ctx
}
