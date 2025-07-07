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

This SDK does not provide its own theme provider. Please use [next-themes](https://github.com/pacocoursey/next-themes) or the [shadcn/ui theme system](https://ui.shadcn.com/docs/dark-mode) in your app. Okito SDK components will automatically follow your app's theme (e.g., via the `dark` class or CSS variables).

> Theme support is powered by [next-themes](https://github.com/pacocoursey/next-themes) and inspired by [shadcn/ui](https://ui.shadcn.com/).

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

## API Reference

### OkitoProvider
Wrap your app with this provider to enable Okito SDK features:
```tsx
import { OkitoProvider } from 'sdk';

<OkitoProvider>
  <App />
</OkitoProvider>
```

### createConfig
Call this in your `okito.config.ts` to set up your config globally:
```ts
import { createConfig } from 'sdk';

export const okitoConfig = createConfig({
  network: 'mainnet-beta',
  merchantPublicKey: 'YOUR_PUBLIC_KEY',
  tokens: ['USDC']
});
```

### useOkitoConfig
Access your resolved config anywhere in your app:
```ts
import { useOkitoConfig } from 'sdk';
const config = useOkitoConfig();
```

## License

MIT
