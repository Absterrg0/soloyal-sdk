#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configTemplate = `import type { OkitoConfig } from "sdk";

export const okitoConfig: OkitoConfig = {
  network: "mainnet-beta",
  merchantPublicKey: "YOUR_PUBLIC_KEY_HERE",
  tokens: ["USDC"]
};
`;

const targetPath = path.join(process.cwd(), 'okito.config.ts');

if (fs.existsSync(targetPath)) {
  console.log('okito.config.ts already exists in this directory.');
  process.exit(1);
}

fs.writeFileSync(targetPath, configTemplate);
console.log('Created okito.config.ts in your project root!');
