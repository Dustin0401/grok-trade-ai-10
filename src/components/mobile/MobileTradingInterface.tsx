import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Wallet, 
  Menu,
  Maximize2,
  RefreshCw,
  Settings,
  Bell
} from 'lucide-react';
import { useRealTimePrice } from '@/hooks/useRealTimePrice';

const MobileTradingInterface = () => {
  const [activeSymbol, setActiveSymbol] = useState('GROK/USDT');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const symbols = ['GROK/USDT', 'BTC/USDT', 'ETH/USDT', 'SOL/USDT'];
  const { prices, isConnected, connectionStatus } = useRealTimePrice({ symbols });

  const currentPrice = prices[activeSymbol]?.price || 0;

  const QuickTradeCard = () => (
    <Card className="gradient-card border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Quick Trade</CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs ${isConnected ? 'border-bull text-bull' : 'border-bear text-bear'}`}
            >
              {connectionStatus}
            </Badge>
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Symbol Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {symbols.map(symbol => (
            <Button
              key={symbol}
              variant={activeSymbol === symbol ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSymbol(symbol)}
              className="flex-shrink-0 text-xs"
            >
              {symbol.split('/')[0]}
            </Button>
          ))}
        </div>

        {/* Current Price */}
        <div className="bg-muted/20 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Price</span>
            <div className="text-right">
              <div className="font-mono font-semibold">
                ${currentPrice.toFixed(4)}
              </div>
              <div className={`text-xs ${prices[activeSymbol]?.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>
                {prices[activeSymbol]?.change24h >= 0 ? '+' : ''}
                {prices[activeSymbol]?.change24h?.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Buy/Sell Toggle */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={side === 'buy' ? "default" : "outline"}
            onClick={() => setSide('buy')}
            className={side === 'buy' ? 'bg-bull hover:bg-bull/90' : ''}
          >
            Buy
          </Button>
          <Button
            variant={side === 'sell' ? "default" : "outline"}
            onClick={() => setSide('sell')}
            className={side === 'sell' ? 'bg-bear hover:bg-bear/90' : ''}
          >
            Sell
          </Button>
        </div>

        {/* Order Type */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={orderType === 'market' ? "secondary" : "outline"}
            size="sm"
            onClick={() => setOrderType('market')}
          >
            Market
          </Button>
          <Button
            variant={orderType === 'limit' ? "secondary" : "outline"}
            size="sm"
            onClick={() => setOrderType('limit')}
          >
            Limit
          </Button>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <Label className="text-sm">Amount ({activeSymbol.split('/')[0]})</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="font-mono"
          />
        </div>

        {/* Price Input (for limit orders) */}
        {orderType === 'limit' && (
          <div className="space-y-2">
            <Label className="text-sm">Price (USDT)</Label>
            <Input
              type="number"
              placeholder={currentPrice.toFixed(4)}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="font-mono"
            />
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-muted/20 p-3 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total</span>
            <span className="font-mono">
              ${((Number(amount) || 0) * (orderType === 'limit' ? Number(price) || currentPrice : currentPrice)).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Fee (0.1%)</span>
            <span className="font-mono">
              ${(((Number(amount) || 0) * (orderType === 'limit' ? Number(price) || currentPrice : currentPrice)) * 0.001).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          className={`w-full ${side === 'buy' ? 'bg-bull hover:bg-bull/90' : 'bg-bear hover:bg-bear/90'}`}
          disabled={!amount}
        >
          {side === 'buy' ? 'Buy' : 'Sell'} {activeSymbol.split('/')[0]}
        </Button>
      </CardContent>
    </Card>
  );

  const PriceTickerCard = () => (
    <Card className="gradient-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Live Prices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48">
          <div className="space-y-2">
            {symbols.map(symbol => {
              const priceData = prices[symbol];
              if (!priceData) return null;
              
              return (
                <div 
                  key={symbol}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    activeSymbol === symbol 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border/50 hover:bg-muted/10'
                  }`}
                  onClick={() => setActiveSymbol(symbol)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{symbol}</div>
                      <div className="text-xs text-muted-foreground">
                        Vol: ${(priceData.volume24h / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-sm">
                        ${priceData.price.toFixed(4)}
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${
                        priceData.change24h >= 0 ? 'text-bull' : 'text-bear'
                      }`}>
                        {priceData.change24h >= 0 ? 
                          <TrendingUp className="w-3 h-3" /> : 
                          <TrendingDown className="w-3 h-3" />
                        }
                        {priceData.change24h >= 0 ? '+' : ''}{priceData.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Mobile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-grok rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-grok-foreground" />
          </div>
          <div>
            <h1 className="font-bold">Grok Terminal</h1>
            <p className="text-xs text-muted-foreground">Mobile Trading</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-4">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Wallet className="w-4 h-4" />
                  Portfolio
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="gradient-card border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Balance</p>
              <p className="text-2xl font-bold font-mono">$24,567.89</p>
              <p className="text-sm text-bull font-mono">+$456.23 (1.89%)</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">GROK Balance</div>
              <div className="font-mono font-semibold">1,245.67</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Trading Interface */}
      <Tabs defaultValue="trade" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trade">Trade</TabsTrigger>
          <TabsTrigger value="prices">Prices</TabsTrigger>
          <TabsTrigger value="chart">Chart</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trade" className="mt-6">
          <QuickTradeCard />
        </TabsContent>
        
        <TabsContent value="prices" className="mt-6">
          <PriceTickerCard />
        </TabsContent>
        
        <TabsContent value="chart" className="mt-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Chart</span>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>Mobile chart view</p>
                  <p className="text-xs">Tap to expand</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileTradingInterface;