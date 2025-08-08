import { TrendingUp, TrendingDown, DollarSign, Activity, PieChart, Wallet, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MarketTable from "./MarketTable";
const PortfolioDashboard = () => {
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
    }]
  };
  return <div className="space-y-6">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border border-bull/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Portfolio</p>
                <p className="text-xl font-bold font-mono text-bull">${portfolioData.totalValue.toLocaleString()}</p>
              </div>
              <Wallet className="w-5 h-5 text-bull" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-bear/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">24H P&L</p>
                <p className={`text-xl font-bold font-mono ${portfolioData.dayChange >= 0 ? 'text-bull' : 'text-bear'}`}>
                  {portfolioData.dayChange >= 0 ? '+' : ''}${portfolioData.dayChange.toLocaleString()}
                </p>
              </div>
              {portfolioData.dayChange >= 0 ? <TrendingUp className="w-5 h-5 text-bull" /> : <TrendingDown className="w-5 h-5 text-bear" />}
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-grok/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Grok Balance</p>
                <p className="text-xl font-bold font-mono text-grok">{portfolioData.grokBalance.toLocaleString()}</p>
              </div>
              <Zap className="w-5 h-5 text-grok" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">24H Volume</p>
                <p className="text-xl font-bold font-mono text-accent">$2.4M</p>
              </div>
              <Activity className="w-5 h-5 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

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