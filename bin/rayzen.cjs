#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configTemplate = `import type { RayzenConfig } from "sdk";

export const rayzenConfig: RayzenConfig = {
  network: "mainnet-beta",
  merchantPublicKey: "YOUR_PUBLIC_KEY_HERE",
  tokens: ["USDC"]
};
`;

const targetPath = path.join(process.cwd(), 'rayzen.config.ts');

if (fs.existsSync(targetPath)) {
  console.log('rayzen.config.ts already exists in this directory.');
  process.exit(1);
}

fs.writeFileSync(targetPath, configTemplate);
console.log('Created rayzen.config.ts in your project root!');
