'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Copy, LogOut, Wallet, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import OkitoModal from './okito-modal';
    

export default function OkitoButton({ theme = "dark" }: { theme: "dark" | "light" }) {
    const { publicKey, disconnect, connected } = useWallet();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConnect = () => {
        setIsModalOpen(true);
    };

    const handleDisconnect = async () => {
        await disconnect();
        toast.success('Wallet disconnected');
    };

    const copyAddress = async () => {
        if (publicKey) {
            await navigator.clipboard.writeText(publicKey.toBase58());
            toast.success('Address copied to clipboard');
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
                    variant="default"
                    size="default"
                    className="crypto-glass bg-primary/10 hover:bg-primary/20 dark:bg-primary/15 dark:hover:bg-primary/25 text-primary border-primary/30 hover:border-primary/50 shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 ease-out relative overflow-hidden"
                >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                </Button>
                
                <OkitoModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    theme={theme}
                />
            </>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="default"
                    className="crypto-glass bg-accent/10 hover:bg-accent/20 dark:bg-accent/15 dark:hover:bg-accent/25 text-foreground
                    hover:text-primary border-accent/30 hover:border-accent/50 shadow-accent/10 hover:shadow-accent/20 transition-all duration-300 ease-out relative overflow-hidden"
                >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {formatAddress(publicKey!.toBase58())}
                    <ChevronDown className="w-4 h-4 opacity-60" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="end" 
                className="w-48 crypto-glass bg-popover/95 backdrop-blur-xl border-border/50"
            >
        
                <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
                    <Copy className="w-4 h-4" />
                    Copy Address
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    onClick={handleDisconnect} 
                    variant="destructive"
                    className="cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    Disconnect
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 