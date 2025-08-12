import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Search, Star, ExternalLink, Filter, ArrowUpDown, MoreHorizontal, Eye, Heart } from "lucide-react";
import { useRealTimePrice } from "@/hooks/useRealTimePrice";

const MarketTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterBy, setFilterBy] = useState("all");
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const { prices } = useRealTimePrice({
    symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META']
  });

  const baseMarketData = [
    { rank: 1, symbol: "AAPL", name: "Apple Inc.", basePrice: 180.75, volume: "45.2M", marketCap: "2.85T", liquidity: "High", sector: "Technology" },
    { rank: 2, symbol: "MSFT", name: "Microsoft Corp.", basePrice: 375.20, volume: "28.1M", marketCap: "2.79T", liquidity: "High", sector: "Technology" },
    { rank: 3, symbol: "GOOGL", name: "Alphabet Inc.", basePrice: 142.50, volume: "32.4M", marketCap: "1.78T", liquidity: "High", sector: "Technology" },
    { rank: 4, symbol: "AMZN", name: "Amazon.com Inc.", basePrice: 145.30, volume: "41.7M", marketCap: "1.51T", liquidity: "High", sector: "Consumer" },
    { rank: 5, symbol: "TSLA", name: "Tesla Inc.", basePrice: 245.60, volume: "89.3M", marketCap: "780B", liquidity: "High", sector: "Automotive" },
    { rank: 6, symbol: "NVDA", name: "NVIDIA Corp.", basePrice: 890.45, volume: "67.8M", marketCap: "2.20T", liquidity: "High", sector: "Technology" },
    { rank: 7, symbol: "META", name: "Meta Platforms", basePrice: 512.75, volume: "23.5M", marketCap: "1.30T", liquidity: "High", sector: "Technology" },
    { rank: 8, symbol: "BRK.A", name: "Berkshire Hathaway", basePrice: 545000, volume: "12K", marketCap: "785B", liquidity: "Medium", sector: "Financial" },
    { rank: 9, symbol: "V", name: "Visa Inc.", basePrice: 285.90, volume: "8.9M", marketCap: "620B", liquidity: "High", sector: "Financial" },
    { rank: 10, symbol: "UNH", name: "UnitedHealth Group", basePrice: 525.80, volume: "3.2M", marketCap: "495B", liquidity: "Medium", sector: "Healthcare" },
  ];

  // Enhance market data with real-time prices
  const marketData = baseMarketData.map(stock => {
    const livePrice = prices[stock.symbol];
    const currentPrice = livePrice?.price || stock.basePrice;
    const change24h = livePrice?.change24h || (Math.random() - 0.5) * 10;
    const changePercent = (change24h / currentPrice) * 100;
    
    return {
      ...stock,
      price: currentPrice,
      change: change24h,
      changePercent,
      isWatched: watchlist.includes(stock.symbol)
    };
  });

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  // Filter and sort data
  const filteredData = marketData
    .filter(item => {
      const matchesSearch = item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" || 
                           filterBy === "watchlist" && item.isWatched ||
                           filterBy === item.sector.toLowerCase();
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let aVal: any = a[sortBy as keyof typeof a];
      let bVal: any = b[sortBy as keyof typeof b];
      
      if (typeof aVal === 'string') {
        aVal = parseFloat(aVal.replace(/[^\d.-]/g, '')) || 0;
        bVal = parseFloat(bVal.replace(/[^\d.-]/g, '')) || 0;
      }
      
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

  return (
    <Card className="gradient-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-bull" />
            Live Market Data
            <Badge className="bg-bull/20 text-bull animate-pulse">LIVE</Badge>
          </CardTitle>
        </div>
        
        {/* Advanced Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-muted/50 border-border/50 focus:border-grok/50"
              />
            </div>

            {/* Filter */}
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-36 bg-muted/50 border-border/50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stocks</SelectItem>
                <SelectItem value="watchlist">Watchlist</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="consumer">Consumer</SelectItem>
                <SelectItem value="automotive">Automotive</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-muted/50 border-border/50">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marketCap">Market Cap</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="changePercent">% Change</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="bg-muted/50 border-border/50"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {filteredData.length} stocks
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-xs text-muted-foreground">
                <th className="text-left py-3 px-4 font-medium">#</th>
                <th className="text-left py-3 px-4 font-medium">Asset</th>
                <th className="text-right py-3 px-4 font-medium">Price</th>
                <th className="text-right py-3 px-4 font-medium">24h %</th>
                <th className="text-right py-3 px-4 font-medium">24h Volume</th>
                <th className="text-right py-3 px-4 font-medium">Market Cap</th>
                <th className="text-right py-3 px-4 font-medium">Liquidity</th>
                <th className="text-center py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr 
                  key={item.symbol} 
                  className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleWatchlist(item.symbol)}
                        className="transition-colors"
                      >
                        {item.isWatched ? (
                          <Heart className="w-3 h-3 text-grok fill-grok" />
                        ) : (
                          <Heart className="w-3 h-3 text-muted-foreground hover:text-grok" />
                        )}
                      </button>
                      <span className="text-sm font-mono">{item.rank}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">{item.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{item.symbol}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-32">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="font-mono font-medium">
                      ${item.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className={`flex items-center justify-end gap-1 ${
                      item.changePercent >= 0 ? 'text-bull' : 'text-bear'
                    }`}>
                      {item.changePercent >= 0 ? 
                        <TrendingUp className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                      }
                      <span className="font-mono text-sm font-medium">
                        {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className={`text-xs font-mono ${
                      item.change >= 0 ? 'text-bull/70' : 'text-bear/70'
                    }`}>
                      {item.change >= 0 ? '+' : ''}${item.change.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm font-mono">{item.volume}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm font-mono">{item.marketCap}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        item.liquidity === 'High' 
                          ? 'bg-bull/20 text-bull' 
                          : 'bg-warning/20 text-warning'
                      }`}
                    >
                      {item.liquidity}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs bg-bull/20 hover:bg-bull/30 text-bull border-bull/30">
                        Buy
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs bg-bear/20 hover:bg-bear/30 text-bear border-bear/30">
                        Sell
                      </Button>
                      <button className="p-1 hover:bg-muted/50 rounded transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketTable;