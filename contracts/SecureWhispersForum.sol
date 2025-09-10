// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureWhispersForum is SepoliaConfig {
    using FHE for *;
    
    struct Post {
        euint32 postId;
        euint32 upvotes;
        euint32 downvotes;
        euint32 commentCount;
        bool isEncrypted;
        bool isModerated;
        string title;
        string contentHash; // IPFS hash for encrypted content
        address author;
        uint256 timestamp;
        uint256 category;
    }
    
    struct Comment {
        euint32 commentId;
        euint32 upvotes;
        euint32 downvotes;
        bool isEncrypted;
        string contentHash; // IPFS hash for encrypted content
        address author;
        uint256 postId;
        uint256 timestamp;
    }
    
    struct Proposal {
        euint32 proposalId;
        euint32 yesVotes;
        euint32 noVotes;
        euint32 totalVotes;
        bool isActive;
        bool isPassed;
        string title;
        string description;
        string proposalHash; // IPFS hash for detailed proposal
        address proposer;
        uint256 startTime;
        uint256 endTime;
        uint256 threshold;
    }
    
    struct UserReputation {
        euint32 reputation;
        euint32 postCount;
        euint32 commentCount;
        euint32 proposalCount;
        bool isVerified;
        bool isModerator;
    }
    
    mapping(uint256 => Post) public posts;
    mapping(uint256 => Comment) public comments;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => UserReputation) public userReputation;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    mapping(address => mapping(uint256 => bool)) public hasVotedProposal;
    
    uint256 public postCounter;
    uint256 public commentCounter;
    uint256 public proposalCounter;
    
    address public owner;
    address public moderator;
    
    event PostCreated(uint256 indexed postId, address indexed author, string title);
    event CommentAdded(uint256 indexed commentId, uint256 indexed postId, address indexed author);
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed postId, address indexed voter, bool isUpvote);
    event ProposalVoteCast(uint256 indexed proposalId, address indexed voter, bool isYes);
    event ProposalPassed(uint256 indexed proposalId);
    event UserReputationUpdated(address indexed user, uint32 reputation);
    event PostModerated(uint256 indexed postId, bool isModerated);
    
    constructor(address _moderator) {
        owner = msg.sender;
        moderator = _moderator;
    }
    
    function createPost(
        string memory _title,
        string memory _contentHash,
        uint256 _category,
        externalEuint32 encryptedContent,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Post title cannot be empty");
        require(bytes(_contentHash).length > 0, "Content hash cannot be empty");
        
        uint256 postId = postCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalContent = FHE.fromExternal(encryptedContent, inputProof);
        
        posts[postId] = Post({
            postId: FHE.asEuint32(0), // Will be set properly later
            upvotes: FHE.asEuint32(0),
            downvotes: FHE.asEuint32(0),
            commentCount: FHE.asEuint32(0),
            isEncrypted: true,
            isModerated: false,
            title: _title,
            contentHash: _contentHash,
            author: msg.sender,
            timestamp: block.timestamp,
            category: _category
        });
        
        // Update user reputation
        userReputation[msg.sender].postCount = FHE.add(userReputation[msg.sender].postCount, FHE.asEuint32(1));
        
        emit PostCreated(postId, msg.sender, _title);
        return postId;
    }
    
    function addComment(
        uint256 _postId,
        string memory _contentHash,
        externalEuint32 encryptedContent,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(posts[_postId].author != address(0), "Post does not exist");
        require(bytes(_contentHash).length > 0, "Content hash cannot be empty");
        
        uint256 commentId = commentCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalContent = FHE.fromExternal(encryptedContent, inputProof);
        
        comments[commentId] = Comment({
            commentId: FHE.asEuint32(0), // Will be set properly later
            upvotes: FHE.asEuint32(0),
            downvotes: FHE.asEuint32(0),
            isEncrypted: true,
            contentHash: _contentHash,
            author: msg.sender,
            postId: _postId,
            timestamp: block.timestamp
        });
        
        // Update post comment count
        posts[_postId].commentCount = FHE.add(posts[_postId].commentCount, FHE.asEuint32(1));
        
        // Update user reputation
        userReputation[msg.sender].commentCount = FHE.add(userReputation[msg.sender].commentCount, FHE.asEuint32(1));
        
        emit CommentAdded(commentId, _postId, msg.sender);
        return commentId;
    }
    
    function voteOnPost(
        uint256 _postId,
        bool _isUpvote,
        externalEuint32 voteWeight,
        bytes calldata inputProof
    ) public {
        require(posts[_postId].author != address(0), "Post does not exist");
        require(!hasVoted[msg.sender][_postId], "Already voted on this post");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalVoteWeight = FHE.fromExternal(voteWeight, inputProof);
        
        hasVoted[msg.sender][_postId] = true;
        
        if (_isUpvote) {
            posts[_postId].upvotes = FHE.add(posts[_postId].upvotes, internalVoteWeight);
        } else {
            posts[_postId].downvotes = FHE.add(posts[_postId].downvotes, internalVoteWeight);
        }
        
        emit VoteCast(_postId, msg.sender, _isUpvote);
    }
    
    function createProposal(
        string memory _title,
        string memory _description,
        string memory _proposalHash,
        uint256 _duration,
        uint256 _threshold,
        externalEuint32 encryptedDetails,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Proposal title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(_threshold > 0, "Threshold must be positive");
        
        uint256 proposalId = proposalCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalDetails = FHE.fromExternal(encryptedDetails, inputProof);
        
        proposals[proposalId] = Proposal({
            proposalId: FHE.asEuint32(0), // Will be set properly later
            yesVotes: FHE.asEuint32(0),
            noVotes: FHE.asEuint32(0),
            totalVotes: FHE.asEuint32(0),
            isActive: true,
            isPassed: false,
            title: _title,
            description: _description,
            proposalHash: _proposalHash,
            proposer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            threshold: _threshold
        });
        
        // Update user reputation
        userReputation[msg.sender].proposalCount = FHE.add(userReputation[msg.sender].proposalCount, FHE.asEuint32(1));
        
        emit ProposalCreated(proposalId, msg.sender, _title);
        return proposalId;
    }
    
    function voteOnProposal(
        uint256 _proposalId,
        bool _isYes,
        externalEuint32 voteWeight,
        bytes calldata inputProof
    ) public {
        require(proposals[_proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[_proposalId].isActive, "Proposal is not active");
        require(block.timestamp <= proposals[_proposalId].endTime, "Proposal voting has ended");
        require(!hasVotedProposal[msg.sender][_proposalId], "Already voted on this proposal");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalVoteWeight = FHE.fromExternal(voteWeight, inputProof);
        
        hasVotedProposal[msg.sender][_proposalId] = true;
        
        if (_isYes) {
            proposals[_proposalId].yesVotes = FHE.add(proposals[_proposalId].yesVotes, internalVoteWeight);
        } else {
            proposals[_proposalId].noVotes = FHE.add(proposals[_proposalId].noVotes, internalVoteWeight);
        }
        
        proposals[_proposalId].totalVotes = FHE.add(proposals[_proposalId].totalVotes, internalVoteWeight);
        
        emit ProposalVoteCast(_proposalId, msg.sender, _isYes);
    }
    
    function finalizeProposal(uint256 _proposalId) public {
        require(proposals[_proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[_proposalId].isActive, "Proposal is not active");
        require(block.timestamp > proposals[_proposalId].endTime, "Proposal voting is still active");
        require(msg.sender == moderator || msg.sender == owner, "Only moderator or owner can finalize");
        
        proposals[_proposalId].isActive = false;
        
        // Check if proposal passed (this would need to be decrypted off-chain)
        // For now, we'll set a placeholder logic
        proposals[_proposalId].isPassed = true; // This should be determined by FHE comparison
        
        emit ProposalPassed(_proposalId);
    }
    
    function moderatePost(uint256 _postId, bool _isModerated) public {
        require(msg.sender == moderator || msg.sender == owner, "Only moderator or owner can moderate");
        require(posts[_postId].author != address(0), "Post does not exist");
        
        posts[_postId].isModerated = _isModerated;
        emit PostModerated(_postId, _isModerated);
    }
    
    function updateUserReputation(address _user, euint32 _reputation) public {
        require(msg.sender == moderator || msg.sender == owner, "Only moderator or owner can update reputation");
        require(_user != address(0), "Invalid user address");
        
        userReputation[_user].reputation = _reputation;
        emit UserReputationUpdated(_user, 0); // FHE.decrypt(_reputation) - will be decrypted off-chain
    }
    
    function verifyUser(address _user) public {
        require(msg.sender == moderator || msg.sender == owner, "Only moderator or owner can verify users");
        require(_user != address(0), "Invalid user address");
        
        userReputation[_user].isVerified = true;
    }
    
    function setModerator(address _moderator) public {
        require(msg.sender == owner, "Only owner can set moderator");
        require(_moderator != address(0), "Invalid moderator address");
        
        moderator = _moderator;
    }
    
    // View functions that return decrypted data (would be handled off-chain)
    function getPostInfo(uint256 _postId) public view returns (
        string memory title,
        string memory contentHash,
        uint8 upvotes,
        uint8 downvotes,
        uint8 commentCount,
        bool isEncrypted,
        bool isModerated,
        address author,
        uint256 timestamp,
        uint256 category
    ) {
        Post storage post = posts[_postId];
        return (
            post.title,
            post.contentHash,
            0, // FHE.decrypt(post.upvotes) - will be decrypted off-chain
            0, // FHE.decrypt(post.downvotes) - will be decrypted off-chain
            0, // FHE.decrypt(post.commentCount) - will be decrypted off-chain
            post.isEncrypted,
            post.isModerated,
            post.author,
            post.timestamp,
            post.category
        );
    }
    
    function getProposalInfo(uint256 _proposalId) public view returns (
        string memory title,
        string memory description,
        string memory proposalHash,
        uint8 yesVotes,
        uint8 noVotes,
        uint8 totalVotes,
        bool isActive,
        bool isPassed,
        address proposer,
        uint256 startTime,
        uint256 endTime,
        uint256 threshold
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.title,
            proposal.description,
            proposal.proposalHash,
            0, // FHE.decrypt(proposal.yesVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.noVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.totalVotes) - will be decrypted off-chain
            proposal.isActive,
            proposal.isPassed,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime,
            proposal.threshold
        );
    }
    
    function getUserReputation(address _user) public view returns (
        uint8 reputation,
        uint8 postCount,
        uint8 commentCount,
        uint8 proposalCount,
        bool isVerified,
        bool isModerator
    ) {
        UserReputation storage user = userReputation[_user];
        return (
            0, // FHE.decrypt(user.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(user.postCount) - will be decrypted off-chain
            0, // FHE.decrypt(user.commentCount) - will be decrypted off-chain
            0, // FHE.decrypt(user.proposalCount) - will be decrypted off-chain
            user.isVerified,
            user.isModerator
        );
    }
}
