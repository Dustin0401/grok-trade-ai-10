import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign, Activity, PieChart, Wallet, Zap, BarChart3, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import MarketTable from "./MarketTable";
import { useRealTimePrice } from "@/hooks/useRealTimePrice";
const PortfolioDashboard = () => {
  const [animatedValues, setAnimatedValues] = useState({
    totalValue: 0,
    dayChange: 0,
    grokBalance: 0
  });

  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];
  const { prices, isConnected } = useRealTimePrice({ symbols });

  const portfolioData = {
    totalValue: 24567.89,
    dayChange: 456.23,
    dayChangePercent: 1.89,
    grokBalance: 1245.67,
    positions: [{
      symbol: "AAPL",
      shares: 10,
      value: 1750.30,
      change: 2.45,
      changePercent: 0.14
    }, {
      symbol: "GOOGL",
      shares: 5,
      value: 2890.75,
      change: -15.20,
      changePercent: -0.52
    }, {
      symbol: "MSFT",
      shares: 8,
      value: 2156.40,
      change: 8.90,
      changePercent: 0.41
    }, {
      symbol: "TSLA",
      shares: 12,
      value: 3245.60,
      change: 45.80,
      changePercent: 1.43
    }],
    allocation: [
      { symbol: "AAPL", percentage: 35.2, value: 8640.50 },
      { symbol: "GOOGL", percentage: 28.1, value: 6903.45 },
      { symbol: "MSFT", percentage: 20.5, value: 5034.20 },
      { symbol: "TSLA", percentage: 16.2, value: 3979.74 }
    ],
    performance: {
      dayReturn: 1.89,
      weekReturn: 3.45,
      monthReturn: 8.92,
      ytdReturn: 12.34
    }
  };

  // Animate numbers on component mount
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, setter: (value: number) => void) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        setter(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    animateValue(0, portfolioData.totalValue, 2000, (value) => 
      setAnimatedValues(prev => ({ ...prev, totalValue: value }))
    );
    animateValue(0, portfolioData.dayChange, 2000, (value) => 
      setAnimatedValues(prev => ({ ...prev, dayChange: value }))
    );
    animateValue(0, portfolioData.grokBalance, 2000, (value) => 
      setAnimatedValues(prev => ({ ...prev, grokBalance: value }))
    );
  }, []);

  return <div className="space-y-6">
      {/* Enhanced Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border border-bull/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Portfolio</p>
                <p className="text-xl font-bold font-mono text-bull">
                  ${animatedValues.totalValue.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-bull animate-pulse' : 'bg-muted'}`} />
                  <span className="text-xs text-muted-foreground">
                    {isConnected ? 'Live' : 'Offline'}
                  </span>
                </div>
              </div>
              <Wallet className="w-5 h-5 text-bull" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-bear/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">24H P&L</p>
                <p className={`text-xl font-bold font-mono ${animatedValues.dayChange >= 0 ? 'text-bull' : 'text-bear'}`}>
                  {animatedValues.dayChange >= 0 ? '+' : ''}${animatedValues.dayChange.toLocaleString()}
                </p>
                <p className={`text-xs font-mono ${portfolioData.performance.dayReturn >= 0 ? 'text-bull' : 'text-bear'}`}>
                  {portfolioData.performance.dayReturn >= 0 ? '+' : ''}{portfolioData.performance.dayReturn}%
                </p>
              </div>
              {animatedValues.dayChange >= 0 ? <TrendingUp className="w-5 h-5 text-bull" /> : <TrendingDown className="w-5 h-5 text-bear" />}
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-grok/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Grok Balance</p>
                <p className="text-xl font-bold font-mono text-grok">
                  {animatedValues.grokBalance.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">≈ ${(animatedValues.grokBalance * 0.245).toFixed(2)}</p>
              </div>
              <Zap className="w-5 h-5 text-grok" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-accent/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Performance</p>
                <p className="text-xl font-bold font-mono text-accent">
                  +{portfolioData.performance.ytdReturn}%
                </p>
                <p className="text-xs text-muted-foreground">YTD Return</p>
              </div>
              <Target className="w-5 h-5 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Allocation */}
      <Card className="gradient-card border border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Portfolio Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.allocation.map((asset, index) => (
              <div key={asset.symbol} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary/20 rounded-full" 
                         style={{ backgroundColor: `hsl(${index * 90}, 50%, 50%)` }} />
                    <span className="font-semibold">{asset.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold">{asset.percentage}%</div>
                    <div className="text-xs text-muted-foreground">${asset.value.toLocaleString()}</div>
                  </div>
                </div>
                <Progress 
                  value={asset.percentage} 
                  className="h-2"
                  style={{ 
                    '--progress-background': `hsl(${index * 90}, 50%, 50%)` 
                  } as any}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Table */}
      <MarketTable />

      {/* Portfolio Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Compact Holdings */}

          {/* Compact Holdings */}
          <Card className="gradient-card border border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <PieChart className="w-4 h-4" />
                Holdings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30 text-xs text-muted-foreground">
                      <th className="text-left py-2 px-4 font-medium">Asset</th>
                      <th className="text-right py-2 px-4 font-medium">Qty</th>
                      <th className="text-right py-2 px-4 font-medium">Value</th>
                      <th className="text-right py-2 px-4 font-medium">24h</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.positions.map(position => <tr key={position.symbol} className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-accent/20 rounded flex items-center justify-center">
                              <span className="text-xs font-bold">{position.symbol.slice(0, 2)}</span>
                            </div>
                            <span className="font-semibold text-sm">{position.symbol}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm font-mono">{position.shares}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-mono font-medium text-sm">${position.value.toLocaleString()}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`text-sm font-mono ${position.changePercent >= 0 ? 'text-bull' : 'text-bear'}`}>
                            {position.changePercent >= 0 ? '+' : ''}{position.changePercent.toFixed(2)}%
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
      </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          

          <Card className="gradient-card border border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-bull" />
                Top Gainers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {[{
                symbol: "NVDA",
                price: 890.45,
                percent: 5.35
              }, {
                symbol: "TSLA",
                price: 245.60,
                percent: 5.32
              }, {
                symbol: "AAPL",
                price: 180.75,
                percent: 3.17
              }, {
                symbol: "GOOGL",
                price: 142.50,
                percent: 6.67
              }].map(stock => <div key={stock.symbol} className="flex justify-between items-center p-3 hover:bg-muted/10 transition-colors">
                    <div>
                      <span className="font-semibold text-sm">{stock.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">${stock.price}</div>
                      <div className="text-bull text-xs font-mono">+{stock.percent.toFixed(2)}%</div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default PortfolioDashboard;