"use client";

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { clusterApiUrl, Cluster } from "@solana/web3.js";
import React, { createContext, useContext, useMemo } from "react";
import type { RayzenConfig, RayzenResolvedConfig } from "../rayzen.config.types";
import { validateAndResolveRayzenConfig } from "../config";
import QueryProvider from "./query-provider";

const RayzenConfigContext = createContext<RayzenResolvedConfig | null>(null);

export default function RayzenProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: RayzenConfig;
}) {
  const endpoint = clusterApiUrl(config.network as Cluster);
  const resolvedConfig = useMemo(() => validateAndResolveRayzenConfig(config), [config]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <RayzenConfigContext.Provider value={resolvedConfig}>
          <QueryProvider>
          {children}
          </QueryProvider>
        </RayzenConfigContext.Provider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useRayzenConfig(): RayzenResolvedConfig {
  const ctx = useContext(RayzenConfigContext);
  if (!ctx) throw new Error("useRayzenConfig must be used within a RayzenProvider");
  return ctx;
}
