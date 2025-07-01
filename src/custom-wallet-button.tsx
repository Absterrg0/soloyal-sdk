'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { Copy, LogOut, Wallet, ChevronDown } from 'lucide-react';
import CustomWalletModal from './custom-modal';
import { Button } from './components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './components/dropdown-menu';


export default function CustomWalletButton() {
    const { publicKey, disconnect, connected } = useWallet();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConnect = () => {
        setIsModalOpen(true);
    };

    const handleDisconnect = async () => {
        await disconnect();
    };

    const copyAddress = async () => {
        if (publicKey) {
            await navigator.clipboard.writeText(publicKey.toBase58());
        }
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    if (!connected) {
        return (
            <>
                <Button
                    onClick={handleConnect}
                    className="crypto-glass bg-primary/10 hover:bg-primary/20 dark:bg-primary/15 dark:hover:bg-primary/25 text-primary border-primary/30 hover:border-primary/50 shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 ease-out relative overflow-hidden"
                >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                </Button>
                
                <CustomWalletModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                />
            </>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuContent 
                align="end" 
                className="w-48 crypto-glass bg-popover/95 backdrop-blur-xl border-border/50"
            >
                <DropdownMenuTrigger asChild>
                    <Button
                        className="crypto-glass bg-accent/10 hover:bg-accent/20 dark:bg-accent/15 dark:hover:bg-accent/25 text-foreground
                        hover:text-primary border-accent/30 hover:border-accent/50 shadow-accent/10 hover:shadow-accent/20 transition-all duration-300 ease-out relative overflow-hidden"
                    >
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        {formatAddress(publicKey!.toBase58())}
                        <ChevronDown className="w-4 h-4 opacity-60" />
                    </Button>
                </DropdownMenuTrigger>
                <div>
                    <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
                        <Copy className="w-4 h-4" />
                        Copy Address
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                        onClick={handleDisconnect} 
                        className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 