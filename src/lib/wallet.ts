import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Secure Whispers Forum',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [sepolia, mainnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
