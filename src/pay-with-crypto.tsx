'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from './components/button';
import { getSoloyalConfig } from './config';
import { pay } from './pay';

export function PayWithCrypto({ amount }: { amount: number }) {
  const wallet = useWallet();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const config = getSoloyalConfig();

  const handleClick = () => {
    if (!wallet.connected) {
      wallet.connect().catch(() => {});
    } else {
      setDialogOpen(true);
    }
  };

  const handleTokenPay = async (token: 'USDC' | 'USDT') => {
    setIsPaying(true);
    setError(null);
    setTxHash(null);

    try {
      const sig = await pay(wallet, amount, token);
      setTxHash(sig);
    } catch (err) {
      console.error(err);
      setError('Transaction failed. Please try again.');
    }

    setIsPaying(false);
  };

  return (
    <>
      <Button onClick={handleClick} variant="default" className="w-full">
        Pay with Crypto
      </Button>

      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md p-6 relative"
          >
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xl"
              onClick={() => setDialogOpen(false)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Complete Payment</h2>
            </div>

            {!wallet.connected && (
              <p className="text-sm text-muted-foreground">
                Connect your wallet to continue.
              </p>
            )}

            {wallet.connected && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Choose a token to pay {amount}:
                </p>

                {config.tokens.map((token) => (
                  <Button
                    key={token}
                    variant="secondary"
                    className="w-full"
                    disabled={isPaying}
                    onClick={() => handleTokenPay(token)}
                  >
                    {isPaying ? 'Processing...' : `Pay with ${token}`}
                  </Button>
                ))}

                {txHash && (
                  <p className="text-sm text-green-600 break-all">
                    ✅ Payment complete: <br />
                    <a
                      href={`https://explorer.solana.com/tx/${txHash}?cluster=${config.network}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {txHash}
                    </a>
                  </p>
                )}

                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
