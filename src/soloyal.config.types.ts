// types/soloyal-config.ts

/**
 * Tokens supported by Soloyal SDK.
 */
export type SoloyalToken = "USDC" | "USDT";

/**
 * Allowed Solana network environments.
 */
export type SoloyalNetwork = "mainnet-beta" | "devnet" | "custom";

/**
 * User-defined config structure for `soloyal.config.ts`
 * 
 * - If network is "mainnet-beta" or "devnet", `rpcUrl` must not be provided.
 * - If network is "custom", `rpcUrl` is required.
 */
export type SoloyalConfig =
  | {
      network: "mainnet-beta" | "devnet";
      rpcUrl?: never;
      merchantPublicKey: string;
      tokens: [SoloyalToken] | [SoloyalToken, SoloyalToken];
    }
  | {
      network: "custom";
      rpcUrl: string;
      merchantPublicKey: string;
      tokens: [SoloyalToken] | [SoloyalToken, SoloyalToken];
    };

/**
 * Internal runtime-resolved config with parsed PublicKey and validated values.
 */
import { PublicKey } from "@solana/web3.js";

export type SoloyalResolvedConfig = {
  network: SoloyalNetwork;
  rpcUrl: string;
  merchantPublicKey: PublicKey;
  tokens: [SoloyalToken] | [SoloyalToken, SoloyalToken];
};
