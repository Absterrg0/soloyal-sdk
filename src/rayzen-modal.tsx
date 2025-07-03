"use client"

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { X, Wallet, Shield, Zap, Lock, ArrowRight } from 'lucide-react';

interface RayzenModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RayzenModal({ isOpen, onClose }: RayzenModalProps) {
    const { wallets, select, connecting } = useWallet();

    if (!isOpen) return null;

    const handleWalletSelect = (walletName: WalletName) => {
        select(walletName);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Enhanced Backdrop with Floating Crypto Elements */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={onClose}
            >
                {/* Floating crypto symbols */}
                <div className="floating-crypto absolute top-20 left-20 w-8 h-8 text-indigo-400/30 animate-crypto-pulse">⬢</div>
                <div className="floating-crypto absolute top-40 right-32 w-6 h-6 text-purple-400/30 animate-bounce">◆</div>
                <div className="floating-crypto absolute bottom-32 left-16 w-10 h-10 text-blue-400/30 animate-crypto-pulse">⬡</div>
                <div className="floating-crypto absolute bottom-20 right-20 w-4 h-4 text-indigo-400/40 animate-bounce">●</div>
                <div className="floating-crypto absolute top-1/2 left-8 w-6 h-6 text-purple-400/20 animate-crypto-pulse">⬟</div>
                <div className="floating-crypto absolute top-32 right-16 w-5 h-5 text-blue-400/25 animate-bounce">▲</div>
            </div>

            {/* Main Modal */}
            <div className="relative w-full max-w-md z-10">
                <div className="crypto-glass rounded-3xl overflow-hidden shadow-2xl crypto-glow">
                    {/* Gradient Header */}
                    <div className="relative p-8 border-b border-gray-200/20 dark:border-gray-700/30">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-800/50 transition-colors group"
                        >
                            <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                        </button>

                        <div className="pr-16">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white crypto-glow">
                                    <Shield className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="gradient-text-updated text-3xl font-bold">
                                        Connect Wallet
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                        Choose your preferred wallet
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements in header */}
                        <div className="floating-crypto absolute top-4 right-20 w-3 h-3 bg-indigo-400/30 rounded-full animate-crypto-pulse"></div>
                        <div className="floating-crypto absolute bottom-4 right-24 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce"></div>
                    </div>

                    {/* Wallet List */}
                    <div className="p-8 max-h-96 overflow-y-auto">
                        <div className="space-y-3">
                            {wallets.map((wallet) => (
                                <button
                                    key={wallet.adapter.name}
                                    onClick={() => handleWalletSelect(wallet.adapter.name)}
                                    disabled={connecting}
                                    className="crypto-glass hover:crypto-glow w-full p-4 rounded-2xl border border-transparent hover:border-indigo-300/50 dark:hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    <div className="relative flex items-center gap-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={wallet.adapter.icon}
                                                alt={wallet.adapter.name}
                                                className="w-12 h-12 rounded-xl crypto-glow"
                                            />
                                        </div>
                                        
                                        <div className="flex-1 text-left">
                                            <div className="gradient-text-updated font-bold text-lg">
                                                {wallet.adapter.name}
                                            </div>
                                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                                {wallet.readyState === 'Installed' ? 'Detected' : 'Not Installed'}
                                            </div>
                                        </div>
                                        
                                        <div className="flex-shrink-0">
                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-200" />
                                        </div>
                                    </div>
                                    
                                    {/* Connecting indicator */}
                                    {connecting && (
                                        <div className="absolute inset-0 bg-indigo-500/10 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-indigo-500 dark:border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-sm font-medium text-indigo-600 dark:text-purple-400">Connecting...</span>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {wallets.length === 0 && (
                            <div className="text-center py-8">
                                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white inline-block mb-4 crypto-glow">
                                    <Wallet className="w-8 h-8" />
                                </div>
                                <h3 className="gradient-text-updated font-bold text-xl mb-2">
                                    No Wallets Found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Please install a Solana wallet extension
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Enhanced Footer */}
                    <div className="border-t border-gray-200/20 dark:border-gray-700/30 px-8 py-6">
                        <div className="flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Shield className="w-3 h-3 text-green-400" />
                                <span>Secure Connection</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="flex items-center gap-2">
                                <Lock className="w-3 h-3 text-blue-400" />
                                <span>Encrypted</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-yellow-400" />
                                <span>Fast</span>
                            </div>
                        </div>
                        
                        <div className="text-center mt-4">
                            <span className="gradient-text-updated font-semibold text-sm">
                                Powered by Rayzen
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}