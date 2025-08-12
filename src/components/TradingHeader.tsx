import { Wallet, Activity, TrendingUp, Bell, Settings, User, Search, BarChart3, Filter, Globe, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRealTimePrice } from "@/hooks/useRealTimePrice";

const TradingHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("stocks");
  const [notifications, setNotifications] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const { prices, isConnected, connectionStatus } = useRealTimePrice({
    symbols: ['BTC/USDT', 'ETH/USDT', 'GROK/USDT', 'AAPL', 'TSLA']
  });

  const marketIndices = [
    { name: "S&P 500", symbol: "SPX", price: 4567.89, change: 0.43 },
    { name: "NASDAQ", symbol: "IXIC", price: 14250.12, change: -0.28 },
    { name: "BTC", symbol: "BTC", price: prices['BTC/USDT']?.price || 45000, change: prices['BTC/USDT']?.change24h || 2.4 },
    { name: "GROK", symbol: "GROK", price: prices['GROK/USDT']?.price || 0.245, change: prices['GROK/USDT']?.change24h || 15.6 }
  ];

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      {/* Main Header */}
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

        {/* Market Indices and Search */}
        <div className="flex items-center space-x-6">
          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 bg-muted/30 border-border/50 focus:border-grok/50"
            />
          </div>

          {/* Market Selector */}
          <Select value={selectedMarket} onValueChange={setSelectedMarket}>
            <SelectTrigger className="w-32 bg-muted/30 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stocks">Stocks</SelectItem>
              <SelectItem value="crypto">Crypto</SelectItem>
              <SelectItem value="forex">Forex</SelectItem>
              <SelectItem value="indices">Indices</SelectItem>
            </SelectContent>
          </Select>

          {/* Market Indices Ticker */}
          <div className="flex items-center space-x-4 overflow-hidden">
            {marketIndices.map((index) => (
              <div key={index.symbol} className="flex items-center space-x-2 animate-fade-in">
                <span className="text-xs text-muted-foreground">{index.name}:</span>
                <span className="text-sm font-mono font-medium">{index.price.toLocaleString()}</span>
                <span className={`text-xs font-mono ${index.change >= 0 ? 'text-bull' : 'text-bear'}`}>
                  {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Controls and Status */}
        <div className="flex items-center space-x-3">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-bull" />
            ) : (
              <WifiOff className="w-4 h-4 text-bear" />
            )}
            <span className={`text-xs font-medium ${isConnected ? 'text-bull' : 'text-bear'}`}>
              {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
            </span>
          </div>

          {/* Portfolio Value */}
          <div className="bg-muted/50 px-3 py-2 rounded-lg border">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-bull" />
              <span className="font-mono text-sm font-medium">$24,567.89</span>
              <span className="text-xs text-bull">+12.4%</span>
            </div>
          </div>

          {/* Grok Balance */}
          <div className="bg-grok/10 border border-grok/30 px-3 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-grok rounded-full animate-pulse"></div>
              <span className="font-mono text-sm font-medium text-grok">1,245.67</span>
              <span className="text-xs text-grok/80">GROK</span>
            </div>
          </div>

          {/* Wallet Status */}
          <Button variant="outline" size="sm" className="gap-2 hover:border-grok/50">
            <Wallet className="w-4 h-4" />
            <span className="font-mono">7x9k...4m2n</span>
            <Badge variant="secondary" className="text-xs bg-bull/20 text-bull border-bull/30">
              Connected
            </Badge>
          </Button>

          {/* Advanced Settings */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Settings className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <h4 className="font-medium">Trading Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" className="text-sm">Dark Mode</Label>
                    <Switch 
                      id="dark-mode" 
                      checked={isDarkMode} 
                      onCheckedChange={setIsDarkMode}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications" className="text-sm">Price Alerts</Label>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="live-updates" className="text-sm">Live Updates</Label>
                    <Switch id="live-updates" checked={isConnected} disabled />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-bear text-xs flex items-center justify-center">
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="border-t border-border/50 bg-muted/20 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="w-4 h-4" />
              Markets
            </Button>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-bull rounded-full animate-pulse"></div>
              <span>Market Open</span>
              <span>•</span>
              <span>Next close: 4:00 PM EST</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TradingHeader;