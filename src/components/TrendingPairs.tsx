import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown, Search, Star, ExternalLink, Flame, Zap } from "lucide-react";

const TrendingPairs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const trendingPairs = [
    { rank: 1, pair: "GROK/USDT", price: 0.0245, change: 45.67, changePercent: 186.3, volume: "12.4M", liquidity: "8.9M", fdv: "245M", holders: "45.2K" },
    { rank: 2, pair: "PEPE/USDT", price: 0.00001234, change: 0.00000234, changePercent: 23.4, volume: "89.2M", liquidity: "45.7M", fdv: "5.2B", holders: "189K" },
    { rank: 3, pair: "SHIB/USDT", price: 0.000008945, change: -0.000000567, changePercent: -5.9, volume: "156.8M", liquidity: "78.9M", fdv: "5.3B", holders: "1.2M" },
    { rank: 4, pair: "DOGE/USDT", price: 0.08934, change: 0.00456, changePercent: 5.4, volume: "234.5M", liquidity: "123.4M", fdv: "12.8B", holders: "4.5M" },
    { rank: 5, pair: "FLOKI/USDT", price: 0.00015678, change: 0.00003456, changePercent: 28.3, volume: "67.8M", liquidity: "34.2M", fdv: "1.5B", holders: "278K" },
    { rank: 6, pair: "BONK/USDT", price: 0.00001892, change: -0.00000345, changePercent: -15.4, volume: "45.6M", liquidity: "23.1M", fdv: "1.2B", holders: "156K" },
    { rank: 7, pair: "WIF/USDT", price: 1.234, change: 0.156, changePercent: 14.5, volume: "78.9M", liquidity: "56.7M", fdv: "1.2B", holders: "89.3K" },
    { rank: 8, pair: "POPCAT/USDT", price: 0.5678, change: -0.0456, changePercent: -7.4, volume: "23.4M", liquidity: "12.8M", fdv: "567M", holders: "34.5K" },
  ];

  const filteredPairs = trendingPairs.filter(pair => 
    pair.pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with search */}
      <Card className="gradient-card border border-grok/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Flame className="w-6 h-6 text-grok" />
              Trending Pairs
              <Badge className="bg-grok/20 text-grok border-grok/30">Live</Badge>
            </CardTitle>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search pairs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 border-border/50 focus:border-grok/50"
              />
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
                        <Star className="w-3 h-3 text-muted-foreground hover:text-grok cursor-pointer" />
                        <span className="text-sm font-mono">{pair.rank}</span>
                        {pair.rank <= 3 && <Flame className="w-3 h-3 text-grok" />}
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
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 bg-bull/20 hover:bg-bull/30 text-bull rounded transition-colors text-xs font-medium opacity-0 group-hover:opacity-100">
                          Buy
                        </button>
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