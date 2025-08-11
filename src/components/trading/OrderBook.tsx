import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  List,
  Settings,
  Zap
} from 'lucide-react';

interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
  percentage?: number;
}

interface OrderBookProps {
  symbol: string;
  currentPrice: number;
  className?: string;
}

const OrderBook = ({ symbol, currentPrice, className }: OrderBookProps) => {
  const [precision, setPrecision] = useState(1);
  const [grouping, setGrouping] = useState(0.01);
  const [viewMode, setViewMode] = useState<'full' | 'buys' | 'sells'>('full');

  // Mock order book data generator
  const generateOrderBook = (): { asks: OrderBookEntry[], bids: OrderBookEntry[] } => {
    const asks: OrderBookEntry[] = [];
    const bids: OrderBookEntry[] = [];
    
    // Generate asks (sell orders) - prices above current price
    for (let i = 1; i <= 15; i++) {
      const price = currentPrice + (i * grouping * currentPrice * 0.0001);
      const quantity = Math.random() * 5 + 0.1;
      const total = price * quantity;
      asks.push({ price, quantity, total });
    }

    // Generate bids (buy orders) - prices below current price
    for (let i = 1; i <= 15; i++) {
      const price = currentPrice - (i * grouping * currentPrice * 0.0001);
      const quantity = Math.random() * 5 + 0.1;
      const total = price * quantity;
      bids.push({ price, quantity, total });
    }

    // Calculate cumulative totals and percentages
    let cumulativeAsks = 0;
    let cumulativeBids = 0;
    const maxAskTotal = asks.reduce((sum, ask) => sum + ask.total, 0);
    const maxBidTotal = bids.reduce((sum, bid) => sum + bid.total, 0);

    asks.forEach(ask => {
      cumulativeAsks += ask.total;
      ask.percentage = (cumulativeAsks / maxAskTotal) * 100;
    });

    bids.forEach(bid => {
      cumulativeBids += bid.total;
      bid.percentage = (cumulativeBids / maxBidTotal) * 100;
    });

    return { asks: asks.reverse(), bids };
  };

  const [orderBook, setOrderBook] = useState(generateOrderBook());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPrice, grouping]);

  const formatPrice = (price: number) => price.toFixed(precision);
  const formatQuantity = (quantity: number) => quantity.toFixed(4);
  const formatTotal = (total: number) => total.toFixed(2);

  const OrderRow = ({ 
    entry, 
    type, 
    index 
  }: { 
    entry: OrderBookEntry; 
    type: 'ask' | 'bid'; 
    index: number;
  }) => (
    <div 
      className={`grid grid-cols-3 gap-2 px-3 py-1.5 text-sm font-mono hover:bg-muted/30 transition-all duration-200 cursor-pointer relative group animate-slide-up`}
      style={{ animationDelay: `${index * 20}ms` }}
    >
      {/* Background depth indicator */}
      <div 
        className={`absolute inset-y-0 right-0 transition-all duration-300 ${
          type === 'ask' 
            ? 'bg-bear-red/10 group-hover:bg-bear-red/20' 
            : 'bg-bull-green/10 group-hover:bg-bull-green/20'
        }`}
        style={{ width: `${entry.percentage || 0}%` }}
      />
      
      <div className={`relative z-10 ${type === 'ask' ? 'text-bear-red' : 'text-bull-green'} font-semibold`}>
        {formatPrice(entry.price)}
      </div>
      <div className="relative z-10 text-right text-foreground">
        {formatQuantity(entry.quantity)}
      </div>
      <div className="relative z-10 text-right text-muted-foreground">
        {formatTotal(entry.total)}
      </div>
    </div>
  );

  return (
    <Card className={`h-full bg-gradient-to-br from-card/95 to-card/90 backdrop-blur-xl border-primary/20 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Order Book</h3>
            <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30">
              {symbol}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="text-xs">
              <Settings className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Zap className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('full')}
            className={`text-xs px-3 py-1 h-7 ${viewMode === 'full' ? 'bg-primary text-primary-foreground' : ''}`}
          >
            <List className="w-3 h-3 mr-1" />
            Full
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('buys')}
            className={`text-xs px-3 py-1 h-7 ${viewMode === 'buys' ? 'bg-bull-green text-white' : ''}`}
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            Buys
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('sells')}
            className={`text-xs px-3 py-1 h-7 ${viewMode === 'sells' ? 'bg-bear-red text-white' : ''}`}
          >
            <TrendingDown className="w-3 h-3 mr-1" />
            Sells
          </Button>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-3 gap-2 px-3 py-2 text-xs text-muted-foreground font-medium border-b border-border/30 bg-muted/20">
        <div>Price (USDT)</div>
        <div className="text-right">Amount ({symbol.split('/')[0]})</div>
        <div className="text-right">Total</div>
      </div>

      {/* Order Book Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
          {/* Asks (Sell Orders) */}
          {(viewMode === 'full' || viewMode === 'sells') && (
            <div className="space-y-0">
              {orderBook.asks.map((ask, index) => (
                <OrderRow key={`ask-${index}`} entry={ask} type="ask" index={index} />
              ))}
            </div>
          )}

          {/* Current Price */}
          {viewMode === 'full' && (
            <div className="relative py-3 px-3">
              <Separator className="mb-2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Last Price</span>
                  <Badge className="bg-primary/20 text-primary">
                    ≈ {formatPrice(currentPrice)}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Spread: {((orderBook.asks[orderBook.asks.length - 1]?.price - orderBook.bids[0]?.price) || 0).toFixed(2)}
                </div>
              </div>
              <Separator className="mt-2" />
            </div>
          )}

          {/* Bids (Buy Orders) */}
          {(viewMode === 'full' || viewMode === 'buys') && (
            <div className="space-y-0">
              {orderBook.bids.map((bid, index) => (
                <OrderRow key={`bid-${index}`} entry={bid} type="bid" index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-3 border-t border-border/50 bg-muted/10">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bid Sum:</span>
            <span className="font-mono text-bull-green">
              {orderBook.bids.reduce((sum, bid) => sum + bid.total, 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ask Sum:</span>
            <span className="font-mono text-bear-red">
              {orderBook.asks.reduce((sum, ask) => sum + ask.total, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderBook;