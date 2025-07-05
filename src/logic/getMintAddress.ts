import { PublicKey } from "@solana/web3.js";

export const getMintAddress =  (mint: "USDC" | "USDT", network: "mainnet-beta" | "devnet" | "custom") => {

    const resolvedNetwork = network === "custom" ? "mainnet-beta" : network;
    const mints = {
        "devnet": {
          USDC: new PublicKey("BXXkv6zRCpzzB4K8GzJJwRGCqkAs7u3fTqYWMvYMgPqa"), // devnet USDC (fake mint)
          USDT: new PublicKey("C8dV1ujnpVaUYZBLsD1fGkx9pVnUo4LxGC7hB9NRWnfa")  // devnet USDT (fake mint)
        },
        "mainnet-beta": {
          USDC: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzy3dKTtWHv5aC88jydDxAz"),
          USDT: new PublicKey("Es9vMFrzaCERQdaYL8xq8gLsXjE7EqE3sGzA4DMwCsxH")
        }
      };

    return mints[resolvedNetwork][mint];
};