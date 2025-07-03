'use client'

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import RayzenModal from './rayzen-modal';
import { Wallet, Power, Zap, Shield } from 'lucide-react';

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
      <div className={`relative ${className}`}>
        <button
          onClick={handleClick}
          className="crypto-glass crypto-glow rounded-2xl px-6 py-4 w-full group relative overflow-hidden"
        >
          <div className="floating-crypto absolute -top-2 -right-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-crypto-pulse"></div>
          </div>
          
          <div className="relative flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-center">
              <div className="gradient-text-updated font-bold text-lg">
                Connected
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
              </div>
            </div>
            <Power className="w-4 h-4 text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={`relative ${className}`}>
        <button
          onClick={handleClick}
          className="crypto-btn-primary w-full rounded-2xl px-8 py-4 group relative overflow-hidden"
        >
          <div className="floating-crypto absolute top-2 right-4">
            <Zap className="w-4 h-4 text-yellow-400 animate-crypto-pulse" />
          </div>
          
          <div className="relative flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg text-white">
              Connect Wallet
            </span>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
            <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="absolute bottom-4 right-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          </div>
        </button>
      </div>

      <RayzenModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
} 