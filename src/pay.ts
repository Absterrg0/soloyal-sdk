import { Connection, Transaction } from "@solana/web3.js";
import { getSoloyalConfig } from "./config";
import { getMintAddress } from "./getMintAddress";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import type { WalletContextState } from "@solana/wallet-adapter-react";

/**
 * Executes a token payment to the configured merchant.
 * 
 * Automatically uses:
 * - The RPC URL from soloyal.config.ts (custom or standard)
 * - The merchant public key
 * - The token mint (USDC/USDT)
 * 
 * @param wallet Wallet from @solana/wallet-adapter-react
 * @param amount Number of tokens to pay (e.g., 2.5)
 * @param token Optional override (USDC/USDT)
 * @returns The transaction signature string
 */
export async function pay(
  wallet: WalletContextState,
  amount: number,
  token?: "USDC" | "USDT"
): Promise<string> {
  if (!wallet?.publicKey || !wallet.signTransaction) {
    throw new Error("Wallet not connected");
  }

  const config = getSoloyalConfig();

  const connection = new Connection(config.rpcUrl, "confirmed");

  const from = wallet.publicKey;
  const to = config.merchantPublicKey;
  const selectedToken = token || config.tokens[0];

  const mint = getMintAddress(selectedToken, config.network);

  const fromTokenAcc = await getAssociatedTokenAddress(mint, from);
  const toTokenAcc = await getAssociatedTokenAddress(mint, to);

  const tx = new Transaction().add(
    createTransferInstruction(
      fromTokenAcc,
      toTokenAcc,
      from,
      amount * 1_000_000 // For 6 decimal tokens like USDC/USDT
    )
  );

  const signed = await wallet.signTransaction(tx);
  const signature = await connection.sendRawTransaction(signed.serialize());

  return signature;
}
