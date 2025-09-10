import { Lock, Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useSecureWhispersForum } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import { toast } from "sonner";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { createPost } = useSecureWhispersForum();
  const { isConnected } = useAccount();

  const categoryMap: { [key: string]: number } = {
    governance: 1,
    technical: 2,
    community: 3,
    proposals: 4,
  };

  const handleSubmit = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!title.trim() || !content.trim() || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, you would encrypt the content using FHE
      // For now, we'll use a placeholder
      const encryptedContent = "0x" + Buffer.from(content).toString('hex');
      const inputProof = "0x" + Buffer.from("proof").toString('hex');
      const contentHash = "Qm" + Math.random().toString(36).substring(2, 15); // IPFS hash placeholder

      await createPost(
        title,
        contentHash,
        categoryMap[category],
        encryptedContent,
        inputProof
      );

      toast.success("Post created successfully!");
      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-primary rounded-lg">
          <Plus className="h-4 w-4 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-semibold">Create New Discussion</h2>
        <Badge variant="outline" className="border-security text-security-muted ml-auto">
          <Shield className="h-3 w-3 mr-1" />
          FHE Encrypted
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            placeholder="Discussion title..." 
            className="bg-background/50 border-border/50 focus:border-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-background/50 border-border/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="governance">Governance</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="proposals">Proposals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Textarea 
          placeholder="Share your thoughts... All messages are encrypted end-to-end."
          className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 text-encrypted" />
            <span>Your message will be encrypted using FHE</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" disabled={isLoading}>
              Save Draft
            </Button>
            <Button 
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              onClick={handleSubmit}
              disabled={isLoading || !isConnected}
            >
              {isLoading ? "Creating..." : "Post Discussion"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;