"use client";

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import React from "react";

export function SoloyalWalletProvider({
  children,
  network = "mainnet-beta"
}: {
  children: React.ReactNode;
  network?: "devnet" | "mainnet-beta";
}) {
  const endpoint = clusterApiUrl(network);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
