import { Shield, Zap, Users, TrendingUp, Lock, FileText, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const stats = [
    { label: "Active Members", value: "2,847", icon: Users },
    { label: "Encrypted Posts", value: "1,234", icon: Lock },
    { label: "Governance Votes", value: "89", icon: TrendingUp },
  ];

  const categories = [
    { name: "Governance", count: 234, color: "text-governance" },
    { name: "Technical", count: 156, color: "text-primary" },
    { name: "Community", count: 89, color: "text-accent" },
    { name: "Proposals", count: 67, color: "text-security" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <Card className="p-4 bg-gradient-card border-border/50">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          Forum Stats
        </h3>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <span className="font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Categories */}
      <Card className="p-4 bg-gradient-card border-border/50">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between hover:bg-background/30 rounded p-2 cursor-pointer transition-colors">
              <span className={`text-sm ${category.color}`}>{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Info */}
      <Card className="p-4 bg-gradient-card border-border/50">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-security" />
          Privacy & Security
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="h-3 w-3 text-encrypted" />
            <span>End-to-end encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3 text-security" />
            <span>FHE protected replies</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-3 w-3" />
            <span>Zero-knowledge proofs</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;