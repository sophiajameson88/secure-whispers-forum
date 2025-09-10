import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Users, Vote, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const Proposals = () => {
  const proposals = [
    {
      id: "PROP-001",
      title: "Protocol Upgrade to V2.0 with Enhanced FHE",
      description: "Comprehensive upgrade introducing advanced fully homomorphic encryption capabilities, improved consensus mechanisms, and enhanced scalability features for the governance protocol.",
      status: "active",
      category: "Technical",
      author: "protocol_team",
      created: "2024-03-01",
      deadline: "2024-03-15",
      votesFor: 234,
      votesAgainst: 45,
      totalVotes: 279,
      quorum: 300,
      participationRate: 93,
      requiredMajority: 66.7
    },
    {
      id: "PROP-002", 
      title: "Treasury Allocation for Security Audits",
      description: "Proposal to allocate 500,000 tokens from the treasury for comprehensive security audits of smart contracts and FHE implementations by top-tier security firms.",
      status: "passed",
      category: "Financial",
      author: "security_committee",
      created: "2024-02-15",
      deadline: "2024-03-01",
      votesFor: 456,
      votesAgainst: 89,
      totalVotes: 545,
      quorum: 300,
      participationRate: 98,
      requiredMajority: 66.7
    },
    {
      id: "PROP-003",
      title: "Community Grant Program for Privacy Research",
      description: "Establish a quarterly grant program to fund research into privacy-preserving technologies, zero-knowledge proofs, and FHE optimizations by academic institutions and independent researchers.",
      status: "draft",
      category: "Community",
      author: "research_dao",
      created: "2024-03-05",
      deadline: "2024-03-20",
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      quorum: 300,
      participationRate: 0,
      requiredMajority: 66.7
    },
    {
      id: "PROP-004",
      title: "Integration with Cross-Chain Privacy Protocols",
      description: "Proposal to integrate with leading cross-chain privacy protocols to enable confidential transactions across multiple blockchain networks while maintaining FHE protection.",
      status: "rejected",
      category: "Technical",
      author: "bridge_team",
      created: "2024-02-01",
      deadline: "2024-02-28",
      votesFor: 123,
      votesAgainst: 234,
      totalVotes: 357,
      quorum: 300,
      participationRate: 85,
      requiredMajority: 66.7
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>;
      case "passed":
        return <Badge className="bg-governance/10 text-governance border-governance/20">Passed</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>;
      case "draft":
        return <Badge className="bg-muted text-muted-foreground border-border">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertCircle className="h-4 w-4 text-primary" />;
      case "passed":
        return <CheckCircle className="h-4 w-4 text-governance" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "draft":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Governance Proposals
              </h1>
              <p className="text-muted-foreground">
                Participate in decentralized governance through encrypted voting on protocol upgrades, treasury allocations, and community initiatives.
              </p>
            </div>

            {/* Proposal Creation */}
            <Card className="mb-6 p-6 bg-gradient-card border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Submit New Proposal</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a new governance proposal for community voting
                  </p>
                </div>
                <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                  Create Proposal
                </Button>
              </div>
            </Card>

            {/* Proposals List */}
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="p-6 bg-gradient-card border-border/50 hover:border-primary/20 transition-colors">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(proposal.status)}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{proposal.title}</h3>
                            {getStatusBadge(proposal.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="font-mono">{proposal.id}</span>
                            <span>by {proposal.author}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {proposal.created}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {proposal.category}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {proposal.description}
                    </p>

                    {/* Voting Progress */}
                    {proposal.status !== "draft" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Voting Progress</span>
                          <span className="font-medium">
                            {proposal.totalVotes} / {proposal.quorum} votes ({proposal.participationRate}%)
                          </span>
                        </div>
                        
                        <Progress 
                          value={(proposal.totalVotes / proposal.quorum) * 100} 
                          className="h-2"
                        />
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-governance">For</span>
                            <span className="font-medium text-governance">
                              {proposal.votesFor} ({((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-destructive">Against</span>
                            <span className="font-medium text-destructive">
                              {proposal.votesAgainst} ({((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {proposal.status === "active" && (
                          <>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Ends {proposal.deadline}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {proposal.requiredMajority}% majority required
                            </span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {proposal.status === "active" && (
                          <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                            <Vote className="h-3 w-3 mr-1" />
                            Vote
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
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

export default Proposals;