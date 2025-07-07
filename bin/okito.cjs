#!/usr/bin/env node

/**
 * Okito CLI
 * Handles project setup for Okito SDK users.
 *
 * Usage:
 *   npx okito --help
 *   npx okito --version
 *   npx okito init
 */
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

function printHelp() {
  console.log(`\nOkito CLI\n\nUsage:\n  npx okito --help         # Show this help message\n  npx okito --version      # Show CLI version\n  npx okito init           # Scaffold okito.config.ts in your project root\n`);
}

const [, , cmd] = process.argv;

if (cmd === '--help' || cmd === '-h') {
  printHelp();
  process.exit(0);
}
if (cmd === '--version' || cmd === '-v') {
  console.log(pkg.version || 'unknown');
  process.exit(0);
}
if (cmd === 'init') {
  const configPath = path.resolve(process.cwd(), 'okito.config.ts');
  if (fs.existsSync(configPath)) {
    console.error('okito.config.ts already exists in this directory.');
    process.exit(1);
  }
  const scaffold = `import { createConfig } from '@okito/sdk';

export const okitoConfig = createConfig({
  network: 'devnet', // or 'mainnet-beta'
  publicKey: 'YOUR_DESTINATION_PUBLIC_KEY',
  tokens: ['USDC', 'USDT']
});
`;
  fs.writeFileSync(configPath, scaffold);
  console.log('Created okito.config.ts in your project root!');
  process.exit(0);
}

console.error('Unknown command. Use npx okito --help for usage.');
process.exit(1);
