import { Lock, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-primary p-2 rounded-lg">
            <Lock className="h-5 w-5 text-primary-foreground" />
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              🔒 FHE Protected
            </h1>
            <p className="text-xs text-muted-foreground">Encrypted Governance Forum</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="/" 
            className={`transition-colors ${
              location.pathname === "/" 
                ? "text-foreground font-medium" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Discussions
          </a>
          <a 
            href="/proposals" 
            className={`transition-colors ${
              location.pathname === "/proposals" 
                ? "text-foreground font-medium" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Proposals
          </a>
          <a 
            href="/analytics" 
            className={`transition-colors ${
              location.pathname === "/analytics" 
                ? "text-foreground font-medium" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Analytics
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;