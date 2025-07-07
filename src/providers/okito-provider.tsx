"use client"

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react"
import { clusterApiUrl, Cluster } from "@solana/web3.js"
import * as React from "react"
import type { OkitoConfig, OkitoResolvedConfig } from "../types/okito.config.types"
import { createConfig, getStoredConfig } from "../logic/config"
import QueryProvider from "./query-provider"
import clsx from "clsx"
import { createContext } from "react"

const OkitoConfigContext = createContext<OkitoResolvedConfig | null>(null)

const ThemeContext = React.createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  systemTheme: "light" | "dark";
} | null>(null)

/**
 * OkitoProvider
 * Provides Solana connection, wallet, and Okito config context to the app.
 *
 * @module OkitoProvider
 */
export default function OkitoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const config = getStoredConfig();
  const endpoint = clusterApiUrl(config.network as Cluster);
  const resolvedConfig = config;

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <OkitoConfigContext.Provider value={resolvedConfig}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </OkitoConfigContext.Provider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

/**
 * Provides Okito SDK context and Solana connection to its children.
 *
 * @param children - React children to be wrapped by the provider.
 * @example
 *   <OkitoProvider>
 *     <App />
 *   </OkitoProvider>
 */
export function useOkitoConfig(): OkitoResolvedConfig {
  const ctx = React.useContext(OkitoConfigContext)
  if (!ctx) throw new Error("useOkitoConfig must be used within a OkitoProvider")
  return ctx
}
