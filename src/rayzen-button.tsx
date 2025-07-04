'use client'

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import RayzenModal from './rayzen-modal';
import { Wallet, Power, Shield } from 'lucide-react';
import { Button } from './components/ui/button';

interface RayzenButtonProps {
  className?: string;
}

export default function RayzenButton({ className = "" }: RayzenButtonProps) {
  const { connected, disconnect, publicKey } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setIsModalOpen(true);
    }
  };

  if (connected) {
    return (
      <div className={`relative w-full ${className}`}>
        <Button
          onClick={handleClick}
          variant="outline"
          size="lg"
          className="crypto-glass rounded-3xl w-full py-5 px-8 flex items-center justify-between group transition-all shadow-lg border-2 border-green-400/40 hover:border-green-500/70 focus-visible:ring-green-400/40"
        >
          <span className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white">
              <Shield className="w-5 h-5" />
            </span>
            <span className="text-left">
              <span className="gradient-text-updated font-bold text-lg block">
                Connected
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono block">
                {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
              </span>
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-crypto-pulse mr-2" />
            <Power className="w-5 h-5 text-red-400 opacity-70 group-hover:opacity-100 transition-opacity" />
          </span>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className={`relative w-full ${className}`}>
        <Button
          onClick={handleClick}
          variant="default"
          size="lg"
          className="crypto-glass rounded-3xl w-full py-5 px-8 flex items-center justify-center gap-4 shadow-lg transition-all group"
        >
          <span className="relative flex items-center gap-3">
            <span className="p-2 rounded-xl bg-primary/90 text-white">
              <Wallet className="w-6 h-6" />
            </span>
            <span className="font-bold text-lg gradient-text-updated">
              Connect Wallet
            </span>
            {/* Animated accent dot */}
            <span className="absolute -top-2 -right-2 w-3 h-3 bg-indigo-400 rounded-full animate-crypto-pulse" />
          </span>
        </Button>
      </div>
      <RayzenModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
} 