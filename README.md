# Secure Whispers Forum

A fully homomorphic encryption (FHE) protected governance forum built with React, TypeScript, and blockchain integration.

## Features

- **FHE Encryption**: All sensitive data is encrypted using fully homomorphic encryption
- **Blockchain Integration**: Smart contract integration for governance and voting
- **Wallet Connection**: Support for multiple wallet providers
- **Secure Discussions**: Encrypted forum discussions and proposals
- **Analytics Dashboard**: Privacy-preserving analytics and insights

## Technologies

This project is built with:

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Solidity smart contracts with FHE support
- **Encryption**: Zama FHE library
- **State Management**: TanStack Query
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/sophiajameson88/secure-whispers-forum.git

# Navigate to the project directory
cd secure-whispers-forum

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Main navigation header
│   ├── CreatePost.tsx  # Post creation component
│   ├── PostCard.tsx    # Individual post display
│   └── Sidebar.tsx     # Sidebar navigation
├── pages/              # Page components
│   ├── Index.tsx       # Main discussions page
│   ├── Proposals.tsx   # Governance proposals
│   ├── Analytics.tsx   # Analytics dashboard
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── contracts/          # Smart contract files
```

## Smart Contracts

The project includes FHE-enabled smart contracts for:

- **Forum Governance**: Encrypted voting and proposal management
- **User Reputation**: Privacy-preserving reputation system
- **Content Moderation**: Encrypted moderation mechanisms

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder to your hosting provider
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Security

This project implements FHE encryption to protect sensitive data. All user communications and governance decisions are encrypted and can only be decrypted by authorized parties.

## Support

For support and questions, please open an issue on GitHub.