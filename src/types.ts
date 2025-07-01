import type { WalletContextState } from "@solana/wallet-adapter-react"
import type { PublicKey } from "@solana/web3.js"

export type PayProps={
    wallet:WalletContextState,
    network:"mainnet-beta" | "devnet",
    merchantPublicKey:PublicKey,
    token: "USDC" | "USDT",
    amount: number 

}
        