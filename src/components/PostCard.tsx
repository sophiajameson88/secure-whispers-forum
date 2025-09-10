import { ArrowUp, ArrowDown, MessageCircle, Lock, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  title: string;
  content: string;
  author: string;
  timestamp: string;
  votes: number;
  replies: number;
  isEncrypted?: boolean;
  category?: string;
}

const PostCard = ({ 
  title, 
  content, 
  author, 
  timestamp, 
  votes, 
  replies, 
  isEncrypted = true,
  category = "Governance" 
}: PostCardProps) => {
  return (
    <Card className="p-6 hover:shadow-card-glow transition-all duration-300 bg-gradient-card border-border/50">
      <div className="flex gap-4">
        {/* Voting */}
        <div className="flex flex-col items-center gap-1 min-w-[40px]">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-governance">
            <ArrowUp className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-governance">{votes}</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-governance">
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            {isEncrypted && (
              <Badge variant="outline" className="text-xs border-encrypted text-encrypted-muted">
                <Lock className="h-3 w-3 mr-1" />
                Encrypted
              </Badge>
            )}
          </div>

          <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-3 line-clamp-3">
            {content}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>by <span className="text-foreground font-medium">{author}</span></span>
            <span>{timestamp}</span>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{replies} replies</span>
            </div>
            {isEncrypted && (
              <div className="flex items-center gap-1 text-encrypted-muted">
                <Shield className="h-4 w-4" />
                <span>End-to-end encrypted</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;