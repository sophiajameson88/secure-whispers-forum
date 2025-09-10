import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  const mockPosts = [
    {
      title: "Proposal: Upgrade Protocol to V2.0 with Enhanced Privacy Features",
      content: "This proposal outlines the technical specifications for upgrading our protocol to version 2.0, which includes enhanced FHE capabilities, improved consensus mechanisms, and better scalability. The upgrade will provide stronger privacy guarantees while maintaining network performance.",
      author: "alice.eth",
      timestamp: "2 hours ago",
      votes: 47,
      replies: 23,
      category: "Governance"
    },
    {
      title: "Technical Discussion: Optimizing FHE Computation Costs",
      content: "Let's discuss strategies to reduce the computational overhead of fully homomorphic encryption in our governance system. I've been researching TFHE libraries and potential optimizations that could improve performance by 30-40%.",
      author: "dev_researcher",
      timestamp: "4 hours ago", 
      votes: 32,
      replies: 18,
      category: "Technical"
    },
    {
      title: "Community Initiative: Weekly Privacy-First Developer Workshops",
      content: "Proposing a series of weekly workshops focused on privacy-preserving technologies and their implementation in governance systems. This would help onboard new developers and strengthen our community's technical expertise.",
      author: "community_lead",
      timestamp: "6 hours ago",
      votes: 28,
      replies: 15,
      category: "Community"
    },
    {
      title: "Security Audit Results: Zero Critical Issues Found",
      content: "The comprehensive security audit of our FHE implementation has been completed. I'm pleased to report zero critical vulnerabilities were found. The audit covered encryption protocols, key management, and consensus mechanisms.",
      author: "security_team",
      timestamp: "8 hours ago",
      votes: 56,
      replies: 31,
      category: "Governance"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <CreatePost />
            
            <div className="space-y-4">
              {mockPosts.map((post, index) => (
                <PostCard
                  key={index}
                  title={post.title}
                  content={post.content}
                  author={post.author}
                  timestamp={post.timestamp}
                  votes={post.votes}
                  replies={post.replies}
                  category={post.category}
                  isEncrypted={true}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
