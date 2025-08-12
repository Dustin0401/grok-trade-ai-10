import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown, Search, Star, ExternalLink } from "lucide-react";

const MarketTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const marketData = [
    { rank: 1, symbol: "AAPL", name: "Apple Inc.", price: 180.75, change: 5.55, changePercent: 3.17, volume: "45.2M", marketCap: "2.85T", liquidity: "High" },
    { rank: 2, symbol: "MSFT", name: "Microsoft Corp.", price: 375.20, change: -2.45, changePercent: -0.65, volume: "28.1M", marketCap: "2.79T", liquidity: "High" },
    { rank: 3, symbol: "GOOGL", name: "Alphabet Inc.", price: 142.50, change: 8.90, changePercent: 6.67, volume: "32.4M", marketCap: "1.78T", liquidity: "High" },
    { rank: 4, symbol: "AMZN", name: "Amazon.com Inc.", price: 145.30, change: -1.20, changePercent: -0.82, volume: "41.7M", marketCap: "1.51T", liquidity: "High" },
    { rank: 5, symbol: "TSLA", name: "Tesla Inc.", price: 245.60, change: 12.40, changePercent: 5.32, volume: "89.3M", marketCap: "780B", liquidity: "High" },
    { rank: 6, symbol: "NVDA", name: "NVIDIA Corp.", price: 890.45, change: 45.20, changePercent: 5.35, volume: "67.8M", marketCap: "2.20T", liquidity: "High" },
    { rank: 7, symbol: "META", name: "Meta Platforms", price: 512.75, change: -8.90, changePercent: -1.71, volume: "23.5M", marketCap: "1.30T", liquidity: "High" },
    { rank: 8, symbol: "BRK.A", name: "Berkshire Hathaway", price: 545000, change: 2500, changePercent: 0.46, volume: "12K", marketCap: "785B", liquidity: "Medium" },
    { rank: 9, symbol: "V", name: "Visa Inc.", price: 285.90, change: 3.45, changePercent: 1.22, volume: "8.9M", marketCap: "620B", liquidity: "High" },
    { rank: 10, symbol: "UNH", name: "UnitedHealth Group", price: 525.80, change: -4.20, changePercent: -0.79, volume: "3.2M", marketCap: "495B", liquidity: "Medium" },
  ];

  const filteredData = marketData.filter(item => 
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="gradient-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-bull" />
            Top Stocks
          </CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
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
                      <Star className="w-3 h-3 text-muted-foreground hover:text-grok cursor-pointer" />
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
                    <button className="p-1 hover:bg-muted/50 rounded transition-colors">
                      <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
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