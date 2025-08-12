import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  PieChart, 
  Target,
  Zap,
  Globe,
  DollarSign
} from 'lucide-react';

interface MarketMetrics {
  totalVolume: number;
  activePairs: number;
  marketCap: number;
  dominance: { symbol: string; percentage: number }[];
  topMovers: { symbol: string; price: number; change: number }[];
  fearGreedIndex: number;
}

const MarketAnalytics = () => {
  const [metrics, setMetrics] = useState<MarketMetrics>({
    totalVolume: 89250000000,
    activePairs: 1247,
    marketCap: 2850000000000,
    dominance: [
      { symbol: 'BTC', percentage: 52.4 },
      { symbol: 'ETH', percentage: 17.8 },
      { symbol: 'USDT', percentage: 5.2 },
      { symbol: 'BNB', percentage: 3.1 }
    ],
    topMovers: [
      { symbol: 'GROK', price: 0.245, change: 15.7 },
      { symbol: 'SOL', price: 89.45, change: 8.9 },
      { symbol: 'AVAX', price: 34.21, change: -4.2 },
      { symbol: 'DOT', price: 7.89, change: 12.3 }
    ],
    fearGreedIndex: 67
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalVolume: prev.totalVolume + (Math.random() - 0.5) * 1000000000,
        topMovers: prev.topMovers.map(mover => ({
          ...mover,
          price: mover.price + (Math.random() - 0.5) * 0.1,
          change: mover.change + (Math.random() - 0.5) * 2
        }))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ title, value, icon: Icon, trend, className = "" }: {
    title: string;
    value: string;
    icon: any;
    trend?: number;
    className?: string;
  }) => (
    <Card className={`gradient-card border-primary/20 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className="text-xl font-bold font-mono">{value}</p>
            {trend !== undefined && (
              <div className={`flex items-center gap-1 mt-1 ${trend >= 0 ? 'text-bull' : 'text-bear'}`}>
                {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-xs font-mono">{trend >= 0 ? '+' : ''}{trend.toFixed(2)}%</span>
              </div>
            )}
          </div>
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="24H Volume"
          value={`$${(metrics.totalVolume / 1000000000).toFixed(2)}B`}
          icon={Activity}
          trend={2.34}
        />
        <MetricCard
          title="Active Pairs"
          value={metrics.activePairs.toLocaleString()}
          icon={Globe}
          trend={0.12}
        />
        <MetricCard
          title="Market Cap"
          value={`$${(metrics.marketCap / 1000000000000).toFixed(2)}T`}
          icon={DollarSign}
          trend={1.89}
        />
        <MetricCard
          title="Fear & Greed"
          value={metrics.fearGreedIndex.toString()}
          icon={Target}
          className={metrics.fearGreedIndex > 50 ? 'border-bull/30' : 'border-bear/30'}
        />
      </div>

      <Tabs defaultValue="dominance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="dominance" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Dominance
          </TabsTrigger>
          <TabsTrigger value="movers" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Top Movers
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Heat Map
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dominance" className="mt-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Market Dominance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.dominance.map((item, index) => (
                  <div key={item.symbol} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">{item.symbol}</span>
                      </div>
                      <span className="font-semibold">{item.symbol}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm font-medium min-w-[4rem] text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movers" className="mt-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Top Movers (24H)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {metrics.topMovers.map((mover, index) => (
                  <div 
                    key={mover.symbol} 
                    className="p-4 border border-border/50 rounded-lg hover:bg-muted/10 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">{mover.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{mover.symbol}</div>
                          <div className="text-sm font-mono">${mover.price.toFixed(4)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant="outline" 
                          className={`${
                            mover.change >= 0 
                              ? 'border-bull/50 text-bull bg-bull/10' 
                              : 'border-bear/50 text-bear bg-bear/10'
                          }`}
                        >
                          {mover.change >= 0 ? '+' : ''}{mover.change.toFixed(2)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="mt-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Market Heat Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {Array.from({ length: 32 }, (_, i) => {
                  const change = (Math.random() - 0.5) * 20;
                  const symbols = ['BTC', 'ETH', 'GROK', 'SOL', 'ADA', 'DOT', 'AVAX', 'LINK'];
                  const symbol = symbols[i % symbols.length] + (Math.floor(i / symbols.length) + 1);
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg p-2 text-xs font-mono text-white flex flex-col justify-between transition-all duration-500 hover:scale-105 cursor-pointer ${
                        change >= 0 
                          ? 'bg-gradient-to-br from-bull to-bull/70' 
                          : 'bg-gradient-to-br from-bear to-bear/70'
                      }`}
                      style={{ 
                        opacity: Math.min(Math.abs(change) / 10 + 0.3, 1),
                        animationDelay: `${i * 50}ms`
                      }}
                    >
                      <div className="font-semibold text-[10px] leading-none">{symbol}</div>
                      <div className="text-[10px] leading-none">
                        {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketAnalytics;