import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Calculator,
  Settings,
  Info,
  AlertTriangle,
  Zap,
  Target,
  Timer,
  Percent
} from 'lucide-react';

interface TradingInterfaceProps {
  symbol: string;
  currentPrice: number;
  baseAsset: string;
  quoteAsset: string;
  className?: string;
}

const TradingInterface = ({ 
  symbol, 
  currentPrice, 
  baseAsset, 
  quoteAsset, 
  className 
}: TradingInterfaceProps) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState('limit');
  const [price, setPrice] = useState(currentPrice.toString());
  const [quantity, setQuantity] = useState('');
  const [percentage, setPercentage] = useState([0]);
  const [stopPrice, setStopPrice] = useState('');
  const [takeProfitPrice, setTakeProfitPrice] = useState('');
  
  // Mock wallet balances
  const baseBalance = 0.12345;
  const quoteBalance = 1250.67;
  
  const balances = {
    [baseAsset]: baseBalance,
    [quoteAsset]: quoteBalance,
    available: {
      [baseAsset]: baseBalance,
      [quoteAsset]: quoteBalance
    }
  };

  useEffect(() => {
    if (orderType === 'market') {
      setPrice(currentPrice.toString());
    }
  }, [orderType, currentPrice]);

  const calculateTotal = () => {
    const priceNum = parseFloat(price) || 0;
    const quantityNum = parseFloat(quantity) || 0;
    return priceNum * quantityNum;
  };

  const calculateFee = () => {
    const total = calculateTotal();
    return total * 0.001; // 0.1% fee
  };

  const getMaxQuantity = () => {
    if (activeTab === 'buy') {
      const availableQuote = balances.available[quoteAsset];
      const priceNum = parseFloat(price) || currentPrice;
      return availableQuote / priceNum;
    } else {
      return balances.available[baseAsset];
    }
  };

  const handlePercentageChange = (value: number[]) => {
    setPercentage(value);
    const maxQty = getMaxQuantity();
    const newQuantity = (maxQty * value[0]) / 100;
    setQuantity(newQuantity.toFixed(6));
  };

  const handlePlaceOrder = () => {
    const orderData = {
      symbol,
      side: activeTab,
      type: orderType,
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      total: calculateTotal(),
      fee: calculateFee()
    };
    
    console.log('Placing order:', orderData);
    // Here you would integrate with your trading API
  };

  const isValidOrder = () => {
    const quantityNum = parseFloat(quantity);
    const priceNum = parseFloat(price);
    const total = calculateTotal();
    
    if (!quantityNum || !priceNum || quantityNum <= 0) return false;
    
    if (activeTab === 'buy') {
      return total <= balances.available[quoteAsset];
    } else {
      return quantityNum <= balances.available[baseAsset];
    }
  };

  return (
    <Card className={`bg-gradient-to-br from-card/95 to-card/90 backdrop-blur-xl border-primary/20 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">Trade {symbol}</h3>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="text-xs">
              <Calculator className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Trading Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'buy' | 'sell')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
          <TabsTrigger 
            value="buy" 
            className="data-[state=active]:bg-bull-green data-[state=active]:text-white"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Buy {baseAsset}
          </TabsTrigger>
          <TabsTrigger 
            value="sell" 
            className="data-[state=active]:bg-bear-red data-[state=active]:text-white"
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            Sell {baseAsset}
          </TabsTrigger>
        </TabsList>

        <div className="p-4 pt-2">
          {/* Order Type Selector */}
          <div className="mb-4">
            <Label className="text-sm font-medium mb-2 block">Order Type</Label>
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="limit">
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3" />
                    Limit Order
                  </div>
                </SelectItem>
                <SelectItem value="market">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3" />
                    Market Order
                  </div>
                </SelectItem>
                <SelectItem value="stop-limit">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" />
                    Stop-Limit
                  </div>
                </SelectItem>
                <SelectItem value="oco">
                  <div className="flex items-center gap-2">
                    <Timer className="w-3 h-3" />
                    OCO
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Input */}
          {orderType !== 'market' && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Price</Label>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>≈ ${currentPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="pr-16 bg-background/50 font-mono"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {quoteAsset}
                </div>
              </div>
              <div className="flex gap-1 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPrice((currentPrice * 0.99).toString())}
                  className="text-xs flex-1"
                >
                  -1%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPrice(currentPrice.toString())}
                  className="text-xs flex-1"
                >
                  Market
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPrice((currentPrice * 1.01).toString())}
                  className="text-xs flex-1"
                >
                  +1%
                </Button>
              </div>
            </div>
          )}

          {/* Stop Price for Stop-Limit Orders */}
          {orderType === 'stop-limit' && (
            <div className="mb-4">
              <Label className="text-sm font-medium mb-2 block">Stop Price</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(e.target.value)}
                  placeholder="0.00"
                  className="pr-16 bg-background/50 font-mono"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {quoteAsset}
                </div>
              </div>
            </div>
          )}

          {/* Quantity Input */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Amount</Label>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Available: {(balances.available[activeTab === 'buy' ? quoteAsset : baseAsset] || 0).toFixed(6)}</span>
                <span>{activeTab === 'buy' ? quoteAsset : baseAsset}</span>
              </div>
            </div>
            <div className="relative">
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0.00"
                className="pr-16 bg-background/50 font-mono"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {baseAsset}
              </div>
            </div>

            {/* Percentage Slider */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Use percentage of balance</span>
                <Badge variant="outline" className="text-xs">
                  <Percent className="w-3 h-3 mr-1" />
                  {percentage[0]}%
                </Badge>
              </div>
              <Slider
                value={percentage}
                onValueChange={handlePercentageChange}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between mt-1">
                {[25, 50, 75, 100].map((pct) => (
                  <Button
                    key={pct}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePercentageChange([pct])}
                    className="text-xs px-2 py-1 h-6"
                  >
                    {pct}%
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-4 p-3 bg-muted/20 rounded-lg border border-border/30">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-mono font-medium">
                  {calculateTotal().toFixed(2)} {quoteAsset}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee (0.1%)</span>
                <span className="font-mono text-muted-foreground">
                  {calculateFee().toFixed(2)} {quoteAsset}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Final Amount</span>
                <span className="font-mono">
                  {activeTab === 'buy' 
                    ? `${parseFloat(quantity || '0').toFixed(6)} ${baseAsset}`
                    : `${(calculateTotal() - calculateFee()).toFixed(2)} ${quoteAsset}`
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <Button
            onClick={handlePlaceOrder}
            disabled={!isValidOrder()}
            className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
              activeTab === 'buy'
                ? 'bg-gradient-to-r from-bull-green to-bull-green/80 hover:from-bull-green/90 hover:to-bull-green/70 text-white shadow-bull-green/30'
                : 'bg-gradient-to-r from-bear-red to-bear-red/80 hover:from-bear-red/90 hover:to-bear-red/70 text-white shadow-bear-red/30'
            } ${!isValidOrder() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
          >
            {activeTab === 'buy' ? (
              <>
                <TrendingUp className="w-5 h-5 mr-2" />
                Buy {baseAsset}
              </>
            ) : (
              <>
                <TrendingDown className="w-5 h-5 mr-2" />
                Sell {baseAsset}
              </>
            )}
          </Button>

          {/* Balance Display */}
          <div className="mt-4 p-3 bg-background/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Wallet Balance</span>
              <Button variant="ghost" size="sm" className="text-xs">
                <Info className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{baseAsset}</span>
                <span className="font-mono">{baseBalance.toFixed(6)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{quoteAsset}</span>
                <span className="font-mono">{quoteBalance.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </Card>
  );
};

export default TradingInterface;