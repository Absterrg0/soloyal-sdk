// types/rayzen-config.ts

/**
 * Tokens supported by Rayzen SDK.
 */
export type RayzenToken = "USDC" | "USDT";

/**
 * Allowed Solana network environments.
 */
export type RayzenNetwork = "mainnet-beta" | "devnet" | "custom";

/**
 * User-defined config structure for `rayzen.config.ts`
 * 
 * - If network is "mainnet-beta" or "devnet", `rpcUrl` must not be provided.
 * - If network is "custom", `rpcUrl` is required.
 */
export type RayzenConfig =
  | {
      network: "mainnet-beta" | "devnet";
      rpcUrl?: never;
      merchantPublicKey: string;
      tokens: [RayzenToken] | [RayzenToken, RayzenToken];
    }
  | {
      network: "custom";
      rpcUrl: string;
      merchantPublicKey: string;
      tokens: [RayzenToken] | [RayzenToken, RayzenToken];
    };

/**
 * Internal runtime-resolved config with parsed PublicKey and validated values.
 */
import { PublicKey } from "@solana/web3.js";

export type RayzenResolvedConfig = {
  network: RayzenNetwork;
  rpcUrl: string;
  merchantPublicKey: PublicKey;
  tokens: [RayzenToken] | [RayzenToken, RayzenToken];
};
