import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import type { OkitoResolvedConfig, OkitoConfig } from "../types/okito.config.types";

/**
 * Validates and resolves a RazenConfig into a RazenResolvedConfig.
 * Throws descriptive errors for invalid configuration.
 */
export function validateAndResolveOkitoConfig(config: OkitoConfig): OkitoResolvedConfig {
  // Clone to avoid mutating the imported config
  const cfg = { ...config } as OkitoConfig;

  const { network, merchantPublicKey, tokens, rpcUrl } = cfg;

  if (!["mainnet-beta", "devnet", "custom"].includes(network)) {
    throw new Error(`Invalid network: ${network}`);
  }

  if (network === "custom" && !rpcUrl) {
    throw new Error("Custom network requires rpcUrl.");
  }

  // Remove rpcUrl for standard networks
  if ((network === "mainnet-beta" || network === "devnet") && rpcUrl) {
    delete (cfg as any).rpcUrl;
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

  return {
    network,
    rpcUrl: network === "custom" ? rpcUrl : clusterApiUrl(network),
    merchantPublicKey: publicKey,
    tokens: [...tokens], // Defensive copy
  };
}