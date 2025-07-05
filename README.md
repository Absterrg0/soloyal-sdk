# Okito SDK

A comprehensive Solana payment SDK with built-in wallet connectivity and theming support.

## Features

- 🔗 **Wallet Connectivity**: Connect to popular Solana wallets (Phantom, MetaMask, Backpack)
- 💳 **Crypto Payments**: Accept USDC and USDT payments
- 🎨 **Automatic Theming**: Automatically adapts to user's system theme preference
- 🌙 **Theme Control**: Manual theme override with system theme detection
- ⚡ **Real-time Updates**: Live transaction status and wallet state

## Installation

```bash
npm install @okito/sdk
```

## Quick Start

### Basic Setup

```tsx
import { OkitoProvider, PayWithCrypto } from '@okito/sdk';

const config = {
  network: 'devnet',
  merchantPublicKey: 'your-merchant-public-key',
  tokens: ['USDC', 'USDT']
};

function App() {
  return (
    <OkitoProvider config={config}>
      <PayWithCrypto 
        amount={10.50}
        onSuccess={(signature) => console.log('Payment successful:', signature)}
        onError={(error) => console.error('Payment failed:', error)}
      />
    </OkitoProvider>
  );
}
```

## Theming

The SDK automatically detects and adapts to the user's system theme preference. You can also provide manual theme control.

### Automatic Theme Detection (Recommended)

```tsx
// Automatically uses system theme
<OkitoProvider config={config}>
  <PayWithCrypto amount={10.50} />
</OkitoProvider>

// Or explicitly use system theme
<OkitoProvider config={config} theme="system">
  <PayWithCrypto amount={10.50} />
</OkitoProvider>
```

### Manual Theme Control

```tsx
// Force light theme
<OkitoProvider config={config} theme="light">
  <PayWithCrypto amount={10.50} />
</OkitoProvider>

// Force dark theme
<OkitoProvider config={config} theme="dark">
  <PayWithCrypto amount={10.50} />
</OkitoProvider>
```

### Theme Toggle Component

Include a theme toggle button for users to manually switch themes:

```tsx
import { ModeToggle } from '@okito/sdk';

function App() {
  return (
    <OkitoProvider config={config}>
      <div>
        <ModeToggle /> {/* Theme toggle button */}
        <PayWithCrypto amount={10.50} />
      </div>
    </OkitoProvider>
  );
}
```

### Using Theme Context

Access theme information in your components:

```tsx
import { useOkitoTheme } from '@okito/sdk';

function MyComponent() {
  const { theme, setTheme, systemTheme } = useOkitoTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>System theme: {systemTheme}</p>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}
```

## Components

### PayWithCrypto

The main payment component that handles wallet connection and payment processing.

```tsx
<PayWithCrypto 
  amount={10.50}
  onSuccess={(signature) => console.log('Success:', signature)}
  onError={(error) => console.error('Error:', error)}
  className="custom-styles"
  label="Pay with Solana"
/>
```

### OkitoButton

Standalone wallet connection button.

```tsx
<OkitoButton />
```

### OkitoModal

Wallet selection modal.

```tsx
<OkitoModal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
```

## Configuration

```tsx
const config = {
  network: 'devnet' | 'mainnet-beta',
  merchantPublicKey: 'your-merchant-public-key',
  tokens: ['USDC', 'USDT']
};
```

## Styling

The SDK uses Tailwind CSS with custom crypto-themed glassmorphism styles. All components automatically adapt to light and dark themes using CSS variables and Tailwind's dark mode classes.

## License

MIT
