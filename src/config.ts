import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import { soloyalConfig } from "./soloyal.config";
import type { SoloyalResolvedConfig, SoloyalConfig } from "./soloyal.config.types";

let cachedConfig: SoloyalResolvedConfig | null = null;

/**
 * Returns the resolved Soloyal configuration.
 * Caches the result for efficiency.
 * Throws descriptive errors for invalid configuration.
 */
export function getSoloyalConfig(): SoloyalResolvedConfig {
  if (cachedConfig) return cachedConfig;

  // Clone to avoid mutating the imported config
  const config = { ...soloyalConfig } as SoloyalConfig;

  const { network, merchantPublicKey, tokens, rpcUrl } = config;

  if (!["mainnet-beta", "devnet", "custom"].includes(network)) {
    throw new Error(`Invalid network: ${network}`);
  }

  if (network === "custom" && !rpcUrl) {
    throw new Error("Custom network requires rpcUrl.");
  }

  // Remove rpcUrl for standard networks
  if ((network === "mainnet-beta" || network === "devnet") && rpcUrl) {
    delete (config as any).rpcUrl;
  }

  let publicKey: PublicKey;
  try {
    publicKey = new PublicKey(merchantPublicKey);
  } catch {
    throw new Error("merchantPublicKey is not a valid Solana public key.");
  }

  if (
    !Array.isArray(tokens) ||
    tokens.length < 1 ||
    tokens.length > 2 ||
    !tokens.every((t) => t === "USDC" || t === "USDT")
  ) {
    throw new Error("Only USDC or USDT are supported in tokens array.");
  }

  const resolved: SoloyalResolvedConfig = {
    network,
    rpcUrl: network === "custom" ? rpcUrl : clusterApiUrl(network),
    merchantPublicKey: publicKey,
    tokens: [...tokens], // Defensive copy
  };

  cachedConfig = resolved;
  return resolved;
}

/**
 * Clears the cached configuration (useful for testing or reloading).
 */
export function clearSoloyalConfigCache() {
  cachedConfig = null;
}