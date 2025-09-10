# Deployment Guide

This guide will help you deploy the Secure Whispers Forum to Vercel.

## Prerequisites

1. A Vercel account
2. A GitHub repository with the project code
3. A WalletConnect Project ID
4. A deployed smart contract address

## Step 1: Prepare Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# WalletConnect Project ID (get from https://cloud.walletconnect.com/)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Deployed contract address
VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress

# Network configuration
VITE_CHAIN_ID=11155111

# IPFS gateway
VITE_IPFS_GATEWAY=https://ipfs.io/ipfs/

# FHE network URL
VITE_FHE_NETWORK_URL=https://api.zama.ai
```

## Step 2: Deploy Smart Contract

Before deploying the frontend, you need to deploy the smart contract:

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. Deploy the contract to Sepolia testnet:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

3. Copy the deployed contract address to your environment variables.

## Step 3: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add environment variables in the Vercel dashboard
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to configure your project

## Step 4: Configure Custom Domain (Optional)

1. In your Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Step 5: Verify Deployment

1. Visit your deployed URL
2. Connect your wallet
3. Test creating a post
4. Verify that transactions are being sent to the blockchain

## Troubleshooting

### Common Issues

1. **Build Failures**: Check that all dependencies are properly installed
2. **Wallet Connection Issues**: Verify your WalletConnect Project ID
3. **Contract Interaction Issues**: Ensure the contract address is correct and deployed
4. **Environment Variables**: Make sure all required environment variables are set

### Support

If you encounter issues, please check:
- Vercel deployment logs
- Browser console for errors
- Network tab for failed requests

## Security Considerations

1. Never commit `.env.local` files to version control
2. Use environment variables for all sensitive configuration
3. Regularly update dependencies for security patches
4. Monitor contract interactions for unusual activity

## Performance Optimization

1. Enable Vercel's Edge Functions for better performance
2. Use Vercel's Image Optimization for any images
3. Configure proper caching headers
4. Monitor Core Web Vitals in Vercel Analytics
