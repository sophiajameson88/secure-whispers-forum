import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Vote, 
  MessageSquare, 
  Shield, 
  Lock,
  Calendar,
  Activity,
  BarChart3,
  PieChart
} from "lucide-react";

const Analytics = () => {
  const keyMetrics = [
    {
      title: "Total Members",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Proposals",
      value: "23",
      change: "+8.2%", 
      trend: "up",
      icon: Vote,
      color: "text-governance"
    },
    {
      title: "Encrypted Posts",
      value: "1,234",
      change: "+15.3%",
      trend: "up",
      icon: Lock,
      color: "text-encrypted"
    },
    {
      title: "Voting Participation",
      value: "87.3%",
      change: "+3.1%",
      trend: "up",
      icon: Activity,
      color: "text-accent"
    }
  ];

  const governanceStats = [
    { label: "Proposals Submitted", value: 156, percentage: 100 },
    { label: "Proposals Passed", value: 89, percentage: 57 },
    { label: "Proposals Rejected", value: 45, percentage: 29 },
    { label: "Proposals Pending", value: 22, percentage: 14 }
  ];

  const privacyMetrics = [
    { label: "FHE Operations", value: "45,678", icon: Shield },
    { label: "Encrypted Votes", value: "12,345", icon: Lock },
    { label: "Zero-Knowledge Proofs", value: "8,901", icon: Activity },
    { label: "Private Messages", value: "3,456", icon: MessageSquare }
  ];

  const topCategories = [
    { name: "Technical Proposals", posts: 234, percentage: 38 },
    { name: "Governance", posts: 189, percentage: 31 },
    { name: "Community Initiatives", posts: 123, percentage: 20 },
    { name: "Treasury & Finance", posts: 67, percentage: 11 }
  ];

  const monthlyActivity = [
    { month: "Jan", posts: 145, votes: 234, members: 89 },
    { month: "Feb", posts: 167, votes: 298, members: 156 },
    { month: "Mar", posts: 198, votes: 345, members: 203 },
    { month: "Apr", posts: 234, votes: 412, members: 267 },
    { month: "May", posts: 278, votes: 456, members: 289 },
    { month: "Jun", posts: 312, votes: 523, members: 334 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Governance Analytics
              </h1>
              <p className="text-muted-foreground">
                Comprehensive insights into community participation, proposal success rates, and privacy-preserving governance metrics.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className="p-4 bg-gradient-card border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                    <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Governance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-governance" />
                  Proposal Success Rate
                </h3>
                <div className="space-y-4">
                  {governanceStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-medium">{stat.value}</span>
                      </div>
                      <Progress value={stat.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-security" />
                  Privacy Metrics
                </h3>
                <div className="space-y-4">
                  {privacyMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <metric.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                      </div>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Category Distribution */}
            <Card className="p-6 bg-gradient-card border-border/50 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Discussion Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {topCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{category.name}</span>
                        <span className="font-medium">{category.posts} posts</span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">613</div>
                    <div className="text-sm text-muted-foreground">Total Discussions</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Monthly Activity Trends */}
            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Monthly Activity Trends
              </h3>
              <div className="grid grid-cols-6 gap-4">
                {monthlyActivity.map((month, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{month.month}</div>
                    <div className="space-y-1">
                      <div className="h-16 bg-primary/20 rounded flex items-end justify-center">
                        <div 
                          className="w-full bg-primary rounded" 
                          style={{ height: `${(month.posts / 350) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs font-medium">{month.posts}</div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 bg-gradient-card border-border/50">
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">4.2</div>
                  <div className="text-sm text-muted-foreground">Avg. Replies per Post</div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-card border-border/50">
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-governance mx-auto mb-2" />
                  <div className="text-2xl font-bold">6.8</div>
                  <div className="text-sm text-muted-foreground">Days Avg. Discussion</div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-card border-border/50">
                <div className="text-center">
                  <Activity className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">92.1%</div>
                  <div className="text-sm text-muted-foreground">User Retention Rate</div>
                </div>
              </Card>
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

export default Analytics;