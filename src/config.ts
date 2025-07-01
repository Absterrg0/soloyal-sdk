import { soloyalConfig } from "./soloyal.config";
import type { SoloyalResolvedConfig,SoloyalConfig } from "./soloyal.config.types";



let cachedConfig: SoloyalResolvedConfig | null = null;



const config = soloyalConfig as SoloyalConfig;


const { network, merchantPublicKey , tokens , rpcUrl} = config;


if (!["mainnet", "devnet", "custom"].includes(network)) {
    throw new Error(`Invalid network: ${network}`);
  }

  // Validate rpcUrl for custom networks
  if (network === "custom" && !rpcUrl) {
    throw new Error("Custom network requires rpcUrl.");
  }
  // Silently drop rpcUrl if set for mainnet-beta or devnet
  if ((network === "mainnet-beta" || network === "devnet") && rpcUrl) {
    (config as any).rpcUrl = undefined;
  }