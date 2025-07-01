export function DropdownMenu({ children }: { children: React.ReactNode }) {
    return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
    return children;
}

export function DropdownMenuContent({ align, className = '', children }: any) {
    // This component is now a simple wrapper, no state or refs
    return (
        <div
            className={`absolute z-50 mt-2 right-0 min-w-[12rem] rounded-xl shadow-lg border ${className}`}
        >
            {children}
        </div>
    );
}
DropdownMenuContent.displayName = 'DropdownMenuContent';

export function DropdownMenuItem({ children, onClick, className = '', ...props }: any) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-accent/10 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
DropdownMenuItem.displayName = 'DropdownMenuItem';

export function DropdownMenuSeparator() {
    return <div className="my-1 border-t border-border/30" />;
}
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';