export function Button({ children, onClick, className = '', ...props }: any) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}