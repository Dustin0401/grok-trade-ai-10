import { Wallet, Activity, TrendingUp, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TradingHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-grok rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-grok-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                Grok Terminal
              </h1>
              <p className="text-xs text-muted-foreground">Professional Trading Platform</p>
            </div>
          </div>
        </div>

        {/* Market Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-bull rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Market Open</span>
          </div>
          <div className="text-sm font-mono">
            <span className="text-muted-foreground">S&P 500:</span>
            <span className="ml-2 text-bull">4,567.89</span>
            <span className="ml-1 text-bull">+0.43%</span>
          </div>
        </div>

        {/* Wallet and Actions */}
        <div className="flex items-center space-x-3">
          {/* Grok Balance */}
          <div className="bg-muted/50 px-4 py-2 rounded-lg border">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-grok rounded-full"></div>
              <span className="font-mono text-sm">1,245.67</span>
              <span className="text-xs text-muted-foreground">GROK</span>
            </div>
          </div>

          {/* Wallet Status */}
          <Button variant="outline" size="sm" className="gap-2">
            <Wallet className="w-4 h-4" />
            <span className="font-mono">7x9k...4m2n</span>
            <Badge variant="secondary" className="text-xs bg-bull/20 text-bull">
              Connected
            </Badge>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-bear"></Badge>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TradingHeader;