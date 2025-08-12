import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Search, Star, ExternalLink, Flame, Zap, Filter, ArrowUpDown, Heart, Sparkles } from "lucide-react";
import { useRealTimePrice } from "@/hooks/useRealTimePrice";

const TrendingPairs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("changePercent");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterBy, setFilterBy] = useState("all");
  const [watchlist, setWatchlist] = useState<string[]>(['GROK/USDT']);

  const { prices } = useRealTimePrice({
    symbols: ['GROK/USDT', 'BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'ADA/USDT', 'DOT/USDT']
  });

  const baseTrendingPairs = [
    { rank: 1, pair: "GROK/USDT", basePrice: 0.0245, volume: "12.4M", liquidity: "8.9M", fdv: "245M", holders: "45.2K", category: "meme" },
    { rank: 2, pair: "PEPE/USDT", basePrice: 0.00001234, volume: "89.2M", liquidity: "45.7M", fdv: "5.2B", holders: "189K", category: "meme" },
    { rank: 3, pair: "SHIB/USDT", basePrice: 0.000008945, volume: "156.8M", liquidity: "78.9M", fdv: "5.3B", holders: "1.2M", category: "meme" },
    { rank: 4, pair: "DOGE/USDT", basePrice: 0.08934, volume: "234.5M", liquidity: "123.4M", fdv: "12.8B", holders: "4.5M", category: "meme" },
    { rank: 5, pair: "FLOKI/USDT", basePrice: 0.00015678, volume: "67.8M", liquidity: "34.2M", fdv: "1.5B", holders: "278K", category: "meme" },
    { rank: 6, pair: "BONK/USDT", basePrice: 0.00001892, volume: "45.6M", liquidity: "23.1M", fdv: "1.2B", holders: "156K", category: "meme" },
    { rank: 7, pair: "WIF/USDT", basePrice: 1.234, volume: "78.9M", liquidity: "56.7M", fdv: "1.2B", holders: "89.3K", category: "meme" },
    { rank: 8, pair: "BTC/USDT", basePrice: 45000, volume: "2.1B", liquidity: "890M", fdv: "890B", holders: "120M", category: "blue-chip" },
    { rank: 9, pair: "ETH/USDT", basePrice: 2800, volume: "1.8B", liquidity: "567M", fdv: "340B", holders: "89M", category: "blue-chip" },
    { rank: 10, pair: "SOL/USDT", basePrice: 89.45, volume: "456M", liquidity: "234M", fdv: "45B", holders: "12M", category: "layer1" },
  ];

  // Enhance pairs data with real-time prices
  const trendingPairs = baseTrendingPairs.map(pair => {
    const livePrice = prices[pair.pair];
    const currentPrice = livePrice?.price || pair.basePrice;
    const change24h = livePrice?.change24h || (Math.random() - 0.5) * 20;
    const changePercent = change24h;
    
    return {
      ...pair,
      price: currentPrice,
      change: (currentPrice * changePercent) / 100,
      changePercent,
      isWatched: watchlist.includes(pair.pair),
      isHot: Math.abs(changePercent) > 10,
      isTrending: pair.rank <= 3
    };
  });

  const toggleWatchlist = (pair: string) => {
    setWatchlist(prev => 
      prev.includes(pair) 
        ? prev.filter(p => p !== pair)
        : [...prev, pair]
    );
  };

  // Filter and sort pairs
  const filteredPairs = trendingPairs
    .filter(pair => {
      const matchesSearch = pair.pair.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" || 
                           filterBy === "watchlist" && pair.isWatched ||
                           filterBy === "hot" && pair.isHot ||
                           filterBy === pair.category;
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
    <div className="space-y-6">
      {/* Header with search */}
      <Card className="gradient-card border border-grok/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Flame className="w-6 h-6 text-grok animate-pulse" />
              Trending Pairs
              <Badge className="bg-grok/20 text-grok border-grok/30 animate-pulse">LIVE</Badge>
            </CardTitle>
          </div>
          
          {/* Advanced Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search pairs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 bg-card/50 border-border/50 focus:border-grok/50"
                />
              </div>

              {/* Filter */}
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40 bg-card/50 border-border/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pairs</SelectItem>
                  <SelectItem value="watchlist">Watchlist</SelectItem>
                  <SelectItem value="hot">🔥 Hot</SelectItem>
                  <SelectItem value="meme">Meme Coins</SelectItem>
                  <SelectItem value="blue-chip">Blue Chip</SelectItem>
                  <SelectItem value="layer1">Layer 1</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 bg-card/50 border-border/50">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="changePercent">% Change</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="liquidity">Liquidity</SelectItem>
                  <SelectItem value="holders">Holders</SelectItem>
                  <SelectItem value="fdv">Market Cap</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="bg-card/50 border-border/50"
              >
                {sortOrder === 'desc' ? '↓' : '↑'}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {filteredPairs.length} pairs
              </Badge>
              <Badge variant="outline" className="text-xs bg-grok/10 text-grok border-grok/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Top Movers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border border-bull/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Top Gainer</p>
                <p className="text-lg font-bold text-bull">GROK/USDT</p>
                <p className="text-sm text-bull">+186.3%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-bull" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-bear/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Top Loser</p>
                <p className="text-lg font-bold text-bear">BONK/USDT</p>
                <p className="text-sm text-bear">-15.4%</p>
              </div>
              <TrendingDown className="w-8 h-8 text-bear" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-accent/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Highest Volume</p>
                <p className="text-lg font-bold text-accent">DOGE/USDT</p>
                <p className="text-sm text-accent">$234.5M</p>
              </div>
              <Zap className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-grok/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Hot Pair</p>
                <p className="text-lg font-bold text-grok">GROK/USDT</p>
                <p className="text-sm text-grok">🔥 Trending</p>
              </div>
              <Flame className="w-8 h-8 text-grok" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Pairs Table */}
      <Card className="gradient-card border border-border/30">
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <table className="w-full">
              <thead className="sticky top-0 bg-card/95 backdrop-blur-sm">
                <tr className="border-b border-border/50 text-xs text-muted-foreground">
                  <th className="text-left py-4 px-4 font-medium">#</th>
                  <th className="text-left py-4 px-4 font-medium">Pair</th>
                  <th className="text-right py-4 px-4 font-medium">Price</th>
                  <th className="text-right py-4 px-4 font-medium">24h %</th>
                  <th className="text-right py-4 px-4 font-medium">24h Volume</th>
                  <th className="text-right py-4 px-4 font-medium">Liquidity</th>
                  <th className="text-right py-4 px-4 font-medium">FDV</th>
                  <th className="text-right py-4 px-4 font-medium">Holders</th>
                  <th className="text-center py-4 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPairs.map((pair, index) => (
                  <tr 
                    key={pair.pair} 
                    className="border-b border-border/20 hover:bg-muted/10 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleWatchlist(pair.pair)}
                          className="transition-colors"
                        >
                          {pair.isWatched ? (
                            <Heart className="w-3 h-3 text-grok fill-grok" />
                          ) : (
                            <Heart className="w-3 h-3 text-muted-foreground hover:text-grok" />
                          )}
                        </button>
                        <span className="text-sm font-mono">{pair.rank}</span>
                        {pair.isTrending && <Flame className="w-3 h-3 text-grok animate-pulse" />}
                        {pair.isHot && <Sparkles className="w-3 h-3 text-accent animate-pulse" />}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-grok/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-grok">{pair.pair.split('/')[0].slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{pair.pair}</div>
                          <div className="text-xs text-muted-foreground">24h volume leader</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="font-mono font-medium text-sm">
                        ${pair.price.toFixed(pair.price < 0.01 ? 8 : 4)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className={`flex items-center justify-end gap-1 ${
                        pair.changePercent >= 0 ? 'text-bull' : 'text-bear'
                      }`}>
                        {pair.changePercent >= 0 ? 
                          <TrendingUp className="w-3 h-3" /> : 
                          <TrendingDown className="w-3 h-3" />
                        }
                        <span className="font-mono text-sm font-medium">
                          {pair.changePercent >= 0 ? '+' : ''}{pair.changePercent.toFixed(1)}%
                        </span>
                      </div>
                      <div className={`text-xs font-mono ${
                        pair.change >= 0 ? 'text-bull/70' : 'text-bear/70'
                      }`}>
                        {pair.change >= 0 ? '+' : ''}${pair.change.toFixed(pair.change < 0.01 ? 8 : 4)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-sm font-mono font-medium">{pair.volume}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-sm font-mono">{pair.liquidity}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-sm font-mono">{pair.fdv}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-sm font-mono">{pair.holders}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs bg-bull/20 hover:bg-bull/30 text-bull border-bull/30">
                          Buy
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs bg-bear/20 hover:bg-bear/30 text-bear border-bear/30">
                          Sell
                        </Button>
                        <button className="p-1 hover:bg-muted/50 rounded transition-colors">
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingPairs;