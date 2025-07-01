
import { clusterApiUrl, Connection, Transaction } from "@solana/web3.js";
import {type PayProps} from './types';
import { getMintAddress } from "./getMintAddress";
import { createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";




export async function pay({
    wallet,
    network,
    merchantPublicKey,
    token,
    amount
}:PayProps){

    if(!wallet ||  !wallet.publicKey || !wallet.signTransaction){
        throw new Error("Wallet not connected");
    }

    const connection = new Connection(clusterApiUrl(network),"confirmed");

    const from = wallet.publicKey;
    const to = merchantPublicKey;


    const tx = new Transaction();

    const mint = getMintAddress(token,network);

    const fromTokenAcc = await getAssociatedTokenAddress(mint,from);
    const toTokenAcc =await  getAssociatedTokenAddress(mint,to);



    const transfer = createTransferInstruction(
        fromTokenAcc,
        toTokenAcc,
        from,
        amount * 1_000_000
    )


    tx.add(transfer);


    const signedTx = await wallet.signTransaction(tx);

    const txHash = await connection.sendRawTransaction(signedTx.serialize());

    return txHash;


}