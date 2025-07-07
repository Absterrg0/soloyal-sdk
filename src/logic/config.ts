/**
 * Okito SDK Config Logic
 * Handles config validation, resolution, and global storage for the OkitoProvider.
 *
 * @module config
 */
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import type { OkitoResolvedConfig, OkitoConfig } from "../types/okito.config.types";

let _storedConfig: OkitoResolvedConfig | null = null;

/**
 * Validates and resolves the user's Okito config, then stores it globally for the provider to use.
 *
 * @param config - The user-defined OkitoConfig object.
 * @returns The resolved OkitoResolvedConfig object.
 * @throws If called more than once.
 * @example
 *   import { createConfig } from 'sdk';
 *   createConfig({ ... });
 */
export function createConfig(config: OkitoConfig): OkitoResolvedConfig {
  _storedConfig = validateAndResolveOkitoConfig(config);
  return _storedConfig;
}

/**
 * Retrieves the globally stored Okito config.
 *
 * @returns The resolved OkitoResolvedConfig object.
 * @throws If config has not been set yet.
 */
export function getStoredConfig(): OkitoResolvedConfig {
  if (!_storedConfig) throw new Error('Okito config not set.  Create a config in your okito.config.ts.');
  return _storedConfig;
}

/**
 * Validates and resolves the user's Okito config.
 *
 * @param config - The user-defined OkitoConfig object.
 * @returns The resolved OkitoResolvedConfig object.
 */
export function validateAndResolveOkitoConfig(config: OkitoConfig): OkitoResolvedConfig {
  // Clone to avoid mutating the imported config
  const cfg = { ...config } as OkitoConfig;

  const { network, publicKey, tokens, rpcUrl } = cfg;

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

  let destinationPublicKey: PublicKey;
  try {
    destinationPublicKey = new PublicKey(publicKey);
  } catch {
    throw new Error("publicKey is not a valid Solana public key.");
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
    publicKey: destinationPublicKey,
    tokens: [...tokens], // Defensive copy
  };
}