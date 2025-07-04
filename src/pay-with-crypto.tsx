"use client";

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import RayzenButton from './rayzen-button';
import { pay } from './pay';
import { useRayzenConfig } from './providers/rayzen-provider';
import { Check, AlertCircle, ExternalLink, Shield, Zap, TrendingUp } from 'lucide-react';

interface PayWithCryptoProps {
  amount: number;
  onSuccess?: (signature: string) => void;
  onError?: (error: Error) => void;
  className?: string;
  label?: string;
}

export default function PayWithCrypto({
  amount,
  onSuccess,
  onError,
  className = "",
  label = "Pay with Crypto"
}: PayWithCryptoProps) {
  const wallet = useWallet();
  const { connected, publicKey } = wallet;
  const config = useRayzenConfig();
  const [selectedToken, setSelectedToken] = useState<'USDC' | 'USDT'>('USDC');
  const [showPayment, setShowPayment] = useState(false);

  const paymentMutation = useMutation({
    mutationFn: async () => {
      if (!publicKey) throw new Error('Wallet not connected');
      return pay(wallet, amount, selectedToken, config);
    },
    onSuccess: (signature) => {
      onSuccess?.(signature);
    },
    onError: (error) => {
      onError?.(error as Error);
    }
  });

  const handlePayment = () => {
    if (!connected) return;
    paymentMutation.mutate();
  };

  if (!connected) {
    return (
      <div className={`crypto-glass rounded-2xl p-8 ${className}`}>
        <div className="text-center space-y-6">
          <div className="floating-crypto">
            <Zap className="w-12 h-12 mx-auto text-indigo-400 animate-crypto-pulse" />
          </div>
          <h3 className="gradient-text-updated text-2xl font-bold">
            Connect Wallet to Pay
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Secure, fast payments with cryptocurrency
          </p>
          <RayzenButton />
        </div>
      </div>
    );
  }

  if (paymentMutation.isSuccess) {
    return (
      <div className={`crypto-glass rounded-2xl p-8 ${className}`}>
        <div className="text-center space-y-6">
          <div className="floating-crypto">
            <Check className="w-16 h-16 mx-auto text-green-400 animate-crypto-pulse" />
          </div>
          <h3 className="gradient-text-updated text-2xl font-bold">
            Payment Successful!
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your transaction has been confirmed on the blockchain
          </p>
          {paymentMutation.data && (
            <a
              href={`https://explorer.solana.com/tx/${paymentMutation.data}?cluster=${config.network}`}
              target="_blank"
              rel="noopener noreferrer"
              className="crypto-btn-secondary inline-flex items-center gap-2"
            >
              View Transaction <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    );
  }

  if (!showPayment) {
    return (
      <div className={`crypto-glass rounded-2xl p-8 ${className}`}>
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="floating-crypto">
              <TrendingUp className="w-12 h-12 mx-auto text-purple-400 animate-crypto-pulse" />
            </div>
            <h3 className="gradient-text-updated text-2xl font-bold">
              {label}
            </h3>
            <div className="crypto-glass rounded-xl p-4">
              <div className="text-3xl font-bold gradient-text-updated">
                ${amount.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Shield className="w-4 h-4 text-green-400" />
              Secured by Solana blockchain
            </div>
            
            <button
              onClick={() => setShowPayment(true)}
              className="crypto-btn-primary w-full"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`crypto-glass rounded-2xl p-8 ${className}`}>
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="gradient-text-updated text-xl font-bold mb-2">
            Complete Payment
          </h3>
          <div className="crypto-glass rounded-xl p-4 mb-4">
            <div className="text-2xl font-bold gradient-text-updated">
              ${amount.toFixed(2)} {selectedToken}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Choose Payment Token
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['USDC', 'USDT'] as const).map((token) => (
                <button
                  key={token}
                  onClick={() => setSelectedToken(token)}
                  className={`crypto-glass rounded-xl p-4 border-2 transition-all ${
                    selectedToken === token
                      ? 'border-indigo-400 crypto-glow'
                      : 'border-transparent hover:border-indigo-200 dark:hover:border-purple-500/30'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold gradient-text-updated">
                      {token}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {token === 'USDC' ? 'USD Coin' : 'Tether USD'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {paymentMutation.isError && (
            <div className="crypto-glass border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-200">
                    Payment Failed
                  </h4>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {paymentMutation.error?.message || 'An error occurred during payment'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setShowPayment(false)}
              className="crypto-btn-secondary flex-1"
              disabled={paymentMutation.isPending}
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              disabled={paymentMutation.isPending}
              className="crypto-btn-primary flex-1"
            >
              {paymentMutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                `Pay ${amount.toFixed(2)} ${selectedToken}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
