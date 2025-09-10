import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';

// Contract ABI - This would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_contentHash", "type": "string"},
      {"internalType": "uint256", "name": "_category", "type": "uint256"},
      {"internalType": "bytes", "name": "encryptedContent", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createPost",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_postId", "type": "uint256"},
      {"internalType": "string", "name": "_contentHash", "type": "string"},
      {"internalType": "bytes", "name": "encryptedContent", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "addComment",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_postId", "type": "uint256"},
      {"internalType": "bool", "name": "_isUpvote", "type": "bool"},
      {"internalType": "bytes", "name": "voteWeight", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "voteOnPost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "string", "name": "_proposalHash", "type": "string"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"},
      {"internalType": "uint256", "name": "_threshold", "type": "uint256"},
      {"internalType": "bytes", "name": "encryptedDetails", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createProposal",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_proposalId", "type": "uint256"},
      {"internalType": "bool", "name": "_isYes", "type": "bool"},
      {"internalType": "bytes", "name": "voteWeight", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "voteOnProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_postId", "type": "uint256"}],
    "name": "getPostInfo",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "contentHash", "type": "string"},
      {"internalType": "uint8", "name": "upvotes", "type": "uint8"},
      {"internalType": "uint8", "name": "downvotes", "type": "uint8"},
      {"internalType": "uint8", "name": "commentCount", "type": "uint8"},
      {"internalType": "bool", "name": "isEncrypted", "type": "bool"},
      {"internalType": "bool", "name": "isModerated", "type": "bool"},
      {"internalType": "address", "name": "author", "type": "address"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "uint256", "name": "category", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_proposalId", "type": "uint256"}],
    "name": "getProposalInfo",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "proposalHash", "type": "string"},
      {"internalType": "uint8", "name": "yesVotes", "type": "uint8"},
      {"internalType": "uint8", "name": "noVotes", "type": "uint8"},
      {"internalType": "uint8", "name": "totalVotes", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isPassed", "type": "bool"},
      {"internalType": "address", "name": "proposer", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"},
      {"internalType": "uint256", "name": "threshold", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserReputation",
    "outputs": [
      {"internalType": "uint8", "name": "reputation", "type": "uint8"},
      {"internalType": "uint8", "name": "postCount", "type": "uint8"},
      {"internalType": "uint8", "name": "commentCount", "type": "uint8"},
      {"internalType": "uint8", "name": "proposalCount", "type": "uint8"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "bool", "name": "isModerator", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address - This would be the deployed contract address
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

export const useSecureWhispersForum = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // Create a new post
  const createPost = async (
    title: string,
    contentHash: string,
    category: number,
    encryptedContent: string,
    inputProof: string
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createPost',
        args: [title, contentHash, category, encryptedContent, inputProof],
      });
      return hash;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  // Add a comment to a post
  const addComment = async (
    postId: number,
    contentHash: string,
    encryptedContent: string,
    inputProof: string
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'addComment',
        args: [postId, contentHash, encryptedContent, inputProof],
      });
      return hash;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  // Vote on a post
  const voteOnPost = async (
    postId: number,
    isUpvote: boolean,
    voteWeight: string,
    inputProof: string
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'voteOnPost',
        args: [postId, isUpvote, voteWeight, inputProof],
      });
      return hash;
    } catch (error) {
      console.error('Error voting on post:', error);
      throw error;
    }
  };

  // Create a proposal
  const createProposal = async (
    title: string,
    description: string,
    proposalHash: string,
    duration: number,
    threshold: number,
    encryptedDetails: string,
    inputProof: string
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createProposal',
        args: [title, description, proposalHash, duration, threshold, encryptedDetails, inputProof],
      });
      return hash;
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  };

  // Vote on a proposal
  const voteOnProposal = async (
    proposalId: number,
    isYes: boolean,
    voteWeight: string,
    inputProof: string
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'voteOnProposal',
        args: [proposalId, isYes, voteWeight, inputProof],
      });
      return hash;
    } catch (error) {
      console.error('Error voting on proposal:', error);
      throw error;
    }
  };

  return {
    createPost,
    addComment,
    voteOnPost,
    createProposal,
    voteOnProposal,
    contractAddress: CONTRACT_ADDRESS,
    isConnected: !!address,
  };
};

// Hook to get post information
export const usePostInfo = (postId: number) => {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getPostInfo',
    args: [postId],
  });
};

// Hook to get proposal information
export const useProposalInfo = (proposalId: number) => {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getProposalInfo',
    args: [proposalId],
  });
};

// Hook to get user reputation
export const useUserReputation = (userAddress: string) => {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getUserReputation',
    args: [userAddress],
  });
};
