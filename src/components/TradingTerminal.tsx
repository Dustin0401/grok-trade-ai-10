import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { 
  Search, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Volume2,
  Settings,
  Maximize2,
  MoreHorizontal,
  BarChart3,
  LineChart,
  CandlestickChart,
  Activity,
  Layers,
  Target,
  Zap,
  Eye,
  Grid3X3
} from "lucide-react";

interface CryptoPair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
}

interface OrderBookItem {
  price: number;
  quantity: number;
  total: number;
}

interface Order {
  price: number;
  quantity: number;
  side: 'buy' | 'sell';
  time: string;
  status: 'open' | 'filled' | 'cancelled';
}

const TradingTerminal = () => {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState('limit');
  const [price, setPrice] = useState('90243.3');
  const [quantity, setQuantity] = useState('0.00006');
  const [searchTerm, setSearchTerm] = useState('');
  const chartRef = useRef<HTMLDivElement>(null);

  // Mock data for crypto pairs - Extended list
  const cryptoPairs: CryptoPair[] = [
    { symbol: 'BTC/USDT', baseAsset: 'BTC', quoteAsset: 'USDT', price: 90243.3, change24h: -0.18, volume24h: 2.22, high24h: 91500, low24h: 89800 },
    { symbol: 'ETH/USDT', baseAsset: 'ETH', quoteAsset: 'USDT', price: 3456.78, change24h: 2.45, volume24h: 1.87, high24h: 3520, low24h: 3380 },
    { symbol: 'BNB/USDT', baseAsset: 'BNB', quoteAsset: 'USDT', price: 645.23, change24h: 1.23, volume24h: 0.89, high24h: 655, low24h: 635 },
    { symbol: 'SOL/USDT', baseAsset: 'SOL', quoteAsset: 'USDT', price: 234.56, change24h: -1.45, volume24h: 1.45, high24h: 245, low24h: 228 },
    { symbol: 'ADA/USDT', baseAsset: 'ADA', quoteAsset: 'USDT', price: 1.234, change24h: 3.45, volume24h: 0.67, high24h: 1.28, low24h: 1.19 },
    { symbol: 'DOT/USDT', baseAsset: 'DOT', quoteAsset: 'USDT', price: 8.456, change24h: -2.34, volume24h: 0.45, high24h: 8.89, low24h: 8.12 },
    { symbol: 'AVAX/USDT', baseAsset: 'AVAX', quoteAsset: 'USDT', price: 42.67, change24h: 4.12, volume24h: 1.23, high24h: 44.5, low24h: 40.8 },
    { symbol: 'MATIC/USDT', baseAsset: 'MATIC', quoteAsset: 'USDT', price: 0.8945, change24h: -1.89, volume24h: 2.34, high24h: 0.92, low24h: 0.87 },
    { symbol: 'LINK/USDT', baseAsset: 'LINK', quoteAsset: 'USDT', price: 16.78, change24h: 2.67, volume24h: 0.98, high24h: 17.2, low24h: 16.1 },
    { symbol: 'UNI/USDT', baseAsset: 'UNI', quoteAsset: 'USDT', price: 9.234, change24h: -0.78, volume24h: 0.56, high24h: 9.45, low24h: 9.12 },
    { symbol: 'LTC/USDT', baseAsset: 'LTC', quoteAsset: 'USDT', price: 123.45, change24h: 1.56, volume24h: 0.78, high24h: 126.7, low24h: 121.2 },
    { symbol: 'BCH/USDT', baseAsset: 'BCH', quoteAsset: 'USDT', price: 456.78, change24h: -2.12, volume24h: 0.34, high24h: 468.9, low24h: 445.6 },
    { symbol: 'ATOM/USDT', baseAsset: 'ATOM', quoteAsset: 'USDT', price: 12.34, change24h: 3.89, volume24h: 0.67, high24h: 12.8, low24h: 11.9 },
    { symbol: 'FTM/USDT', baseAsset: 'FTM', quoteAsset: 'USDT', price: 0.6789, change24h: -1.23, volume24h: 1.45, high24h: 0.69, low24h: 0.66 },
    { symbol: 'ALGO/USDT', baseAsset: 'ALGO', quoteAsset: 'USDT', price: 0.2345, change24h: 2.34, volume24h: 0.89, high24h: 0.24, low24h: 0.23 },
    { symbol: 'XLM/USDT', baseAsset: 'XLM', quoteAsset: 'USDT', price: 0.1234, change24h: -0.89, volume24h: 1.23, high24h: 0.125, low24h: 0.121 },
    { symbol: 'VET/USDT', baseAsset: 'VET', quoteAsset: 'USDT', price: 0.0456, change24h: 1.78, volume24h: 2.34, high24h: 0.047, low24h: 0.044 },
    { symbol: 'TRX/USDT', baseAsset: 'TRX', quoteAsset: 'USDT', price: 0.0789, change24h: -2.45, volume24h: 1.56, high24h: 0.081, low24h: 0.076 },
    { symbol: 'XRP/USDT', baseAsset: 'XRP', quoteAsset: 'USDT', price: 0.5678, change24h: 0.89, volume24h: 3.45, high24h: 0.58, low24h: 0.56 },
    { symbol: 'DOGE/USDT', baseAsset: 'DOGE', quoteAsset: 'USDT', price: 0.0912, change24h: 5.67, volume24h: 4.56, high24h: 0.096, low24h: 0.086 },
  ];

  // Mock order book data
  const orderBookAsks: OrderBookItem[] = [
    { price: 90250.0, quantity: 0.00123, total: 110.99 },
    { price: 90248.5, quantity: 0.00456, total: 411.53 },
    { price: 90247.0, quantity: 0.00789, total: 712.25 },
    { price: 90245.5, quantity: 0.01234, total: 1113.83 },
    { price: 90244.0, quantity: 0.00567, total: 511.48 },
  ];

  const orderBookBids: OrderBookItem[] = [
    { price: 90243.0, quantity: 0.00345, total: 311.34 },
    { price: 90241.5, quantity: 0.00678, total: 612.04 },
    { price: 90240.0, quantity: 0.00912, total: 822.77 },
    { price: 90238.5, quantity: 0.01145, total: 1033.12 },
    { price: 90237.0, quantity: 0.00234, total: 211.15 },
  ];

  // Mock orders data
  const orders: Order[] = [
    { price: 90200, quantity: 0.001, side: 'buy', time: '14:32:15', status: 'open' },
    { price: 90100, quantity: 0.002, side: 'sell', time: '14:30:45', status: 'filled' },
    { price: 90300, quantity: 0.0015, side: 'buy', time: '14:25:30', status: 'cancelled' },
  ];

  const currentPair = cryptoPairs.find(p => p.symbol === selectedPair) || cryptoPairs[0];
  const filteredPairs = cryptoPairs.filter(pair => 
    pair.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Advanced chart rendering with professional styling
  useEffect(() => {
    if (chartRef.current) {
      // Advanced chart simulation with professional candlestick visualization
      chartRef.current.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-background via-muted/5 to-background rounded-lg border border-border/40 relative overflow-hidden">
          <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div class="relative z-10 h-full flex flex-col">
            <div class="flex-1 p-4">
              <svg class="w-full h-full" viewBox="0 0 800 400">
                <!-- Grid lines -->
                <defs>
                  <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" stroke-width="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                <!-- Candlestick chart simulation -->
                ${Array.from({length: 20}, (_, i) => {
                  const x = 50 + i * 35;
                  const basePrice = currentPair.price;
                  const variation = (Math.random() - 0.5) * 1000;
                  const open = basePrice + variation;
                  const close = open + (Math.random() - 0.5) * 500;
                  const high = Math.max(open, close) + Math.random() * 200;
                  const low = Math.min(open, close) - Math.random() * 200;
                  const isGreen = close > open;
                  
                  const scale = 300 / 2000; // Scale factor
                  const yOffset = 200;
                  const openY = yOffset - (open - basePrice + 1000) * scale;
                  const closeY = yOffset - (close - basePrice + 1000) * scale;
                  const highY = yOffset - (high - basePrice + 1000) * scale;
                  const lowY = yOffset - (low - basePrice + 1000) * scale;
                  
                  return `
                    <!-- Wick -->
                    <line x1="${x}" y1="${highY}" x2="${x}" y2="${lowY}" 
                          stroke="${isGreen ? 'hsl(var(--bull-green))' : 'hsl(var(--bear-red))'}" 
                          stroke-width="1"/>
                    <!-- Body -->
                    <rect x="${x-4}" y="${Math.min(openY, closeY)}" width="8" height="${Math.abs(closeY - openY)}" 
                          fill="${isGreen ? 'hsl(var(--bull-green))' : 'hsl(var(--bear-red))'}" 
                          opacity="0.8"/>
                  `;
                }).join('')}
                
                <!-- Price line -->
                <line x1="0" y1="200" x2="800" y2="200" stroke="hsl(var(--bull-green))" stroke-width="2" opacity="0.8" stroke-dasharray="5,5"/>
                
                <!-- Current price label -->
                <rect x="720" y="190" width="70" height="20" fill="hsl(var(--bull-green))" rx="3"/>
                <text x="755" y="202" text-anchor="middle" fill="black" font-size="10" font-weight="bold">
                  ${currentPair.price.toFixed(1)}
                </text>
              </svg>
            </div>
            
            <!-- Volume bars at bottom -->
            <div class="h-16 px-4 pb-2">
              <div class="h-full flex items-end gap-1">
                ${Array.from({length: 20}, (_, i) => {
                  const height = Math.random() * 100;
                  const isGreen = Math.random() > 0.5;
                  return `<div class="flex-1 bg-gradient-to-t ${isGreen ? 'from-bull-green/60 to-bull-green/30' : 'from-bear-red/60 to-bear-red/30'}" style="height: ${height}%"></div>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }, [currentPair]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header */}
      <div className="border-b border-border bg-card px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">{currentPair.symbol}</h2>
              <div className="text-2xl font-mono font-bold text-bull-green">
                {currentPair.price.toLocaleString()}
              </div>
              <Badge variant="secondary" className={`${currentPair.change24h >= 0 ? 'bg-bull-green/20 text-bull-green' : 'bg-bear-red/20 text-bear-red'}`}>
                {currentPair.change24h >= 0 ? '+' : ''}{currentPair.change24h}%
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>24h Change: <span className={currentPair.change24h >= 0 ? 'text-bull-green' : 'text-bear-red'}>{currentPair.change24h}%</span></span>
              <span>24h Volume: {currentPair.volume24h.toFixed(2)} BTC</span>
              <span>24h High: {currentPair.high24h.toLocaleString()}</span>
              <span>24h Low: {currentPair.low24h.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-60px)]">
        {/* Left Sidebar - Market Pairs */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full border-r border-border bg-card flex flex-col">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search pairs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
            </div>
            
            <div className="p-3 border-b border-border">
              <Tabs defaultValue="spot" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="spot">Spot</TabsTrigger>
                  <TabsTrigger value="cross">Cross</TabsTrigger>
                  <TabsTrigger value="isolated">Isolated</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-2 h-[50vh] overflow-y-auto">
                <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground mb-2 px-2">
                  <span>Pair</span>
                  <span className="text-right">Last Price</span>
                  <span className="text-right">Change</span>
                  <span className="text-right">Vol</span>
                </div>
                <div className="space-y-1">
                  {filteredPairs.map((pair) => (
                    <button
                      key={pair.symbol}
                      onClick={() => setSelectedPair(pair.symbol)}
                      className={`w-full p-2 rounded text-left transition-all grid grid-cols-4 gap-2 text-sm ${
                        selectedPair === pair.symbol 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/30'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{pair.baseAsset}</div>
                        <div className="text-xs text-muted-foreground">{pair.quoteAsset}</div>
                      </div>
                      <div className="text-right font-mono">
                        {pair.price.toLocaleString()}
                      </div>
                      <div className={`text-right font-mono ${
                        pair.change24h >= 0 ? 'text-bull-green' : 'text-bear-red'
                      }`}>
                        {pair.change24h >= 0 ? '+' : ''}{pair.change24h.toFixed(2)}%
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        {pair.volume24h.toFixed(2)}M
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Content Area */}
        <ResizablePanel defaultSize={65} minSize={45}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* Chart Area */}
            <ResizablePanel defaultSize={50} minSize={40}>
              <div className="h-full p-4">
                <div className="h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-primary/10 border-primary/30">
                        <CandlestickChart className="w-4 h-4 mr-1" />
                        Market chart
                      </Button>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="text-xs">1s</Button>
                        <Button variant="ghost" size="sm" className="text-xs">5m</Button>
                        <Button variant="ghost" size="sm" className="text-xs bg-primary/20 text-primary">15m</Button>
                        <Button variant="ghost" size="sm" className="text-xs">1h</Button>
                        <Button variant="ghost" size="sm" className="text-xs">4h</Button>
                        <Button variant="ghost" size="sm" className="text-xs">1d</Button>
                      </div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" className="text-xs">
                          <LineChart className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs bg-primary/10">
                          <BarChart3 className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Activity className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Layers className="w-3 h-3 mr-1" />
                          Indicators
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Target className="w-3 h-3 mr-1" />
                          Drawing
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          Alerts
                        </Button>
                      </div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Volume2 className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Grid3X3 className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Maximize2 className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div ref={chartRef} className="h-[calc(100%-4rem)] relative">
                    {/* Advanced chart controls overlay */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                      <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground mb-1">Technical Analysis</div>
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-bull-green"></div>
                          <span>MA(20): 89,456</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>MA(50): 88,923</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-bear-red"></div>
                          <span>RSI: 67.8</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price scale on right */}
                    <div className="absolute right-0 top-0 bottom-16 w-16 bg-card/90 backdrop-blur-sm border-l border-border/50 flex flex-col justify-between text-xs p-2">
                      {Array.from({length: 8}, (_, i) => (
                        <div key={i} className="text-right text-muted-foreground font-mono">
                          {(currentPair.price + (4-i) * 500).toFixed(0)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Orders Section - Now Resizable */}
            <ResizablePanel defaultSize={50} minSize={25} maxSize={60}>
              <div className="h-full border-t border-border bg-card flex flex-col">
                <Tabs defaultValue="open" className="w-full h-full flex flex-col">
                  <div className="border-b border-border px-4 flex-shrink-0">
                    <TabsList className="h-10">
                      <TabsTrigger value="open">Open orders (3)</TabsTrigger>
                      <TabsTrigger value="closed">Closed orders (4)</TabsTrigger>
                      <TabsTrigger value="cancelled">Cancelled orders (0)</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="open" className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-2">
                      <div className="grid grid-cols-6 gap-4 text-xs text-muted-foreground font-medium">
                        <span>Time</span>
                        <span>Symbol</span>
                        <span>Side</span>
                        <span>Price</span>
                        <span>Quantity</span>
                        <span>Total</span>
                      </div>
                      {orders.filter(order => order.status === 'open').map((order, index) => (
                        <div key={index} className="grid grid-cols-6 gap-4 text-sm py-2 border-b border-border/50">
                          <span className="text-muted-foreground">{order.time}</span>
                          <span>{selectedPair}</span>
                          <span className={order.side === 'buy' ? 'text-bull-green' : 'text-bear-red'}>
                            {order.side.toUpperCase()}
                          </span>
                          <span className="font-mono">{order.price.toLocaleString()}</span>
                          <span className="font-mono">{order.quantity}</span>
                          <span className="font-mono">{(order.price * order.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="closed" className="flex-1 p-4 overflow-y-auto">
                    <div className="text-center text-muted-foreground py-8">
                      No closed orders
                    </div>
                  </TabsContent>
                  <TabsContent value="cancelled" className="flex-1 p-4 overflow-y-auto">
                    <div className="text-center text-muted-foreground py-8">
                      No cancelled orders
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Sidebar - Order Form & Order Book */}
        <ResizablePanel defaultSize={15} minSize={12} maxSize={25}>
          <div className="h-full border-l border-border bg-card flex flex-col">
            {/* Order Form */}
            <div className="p-4 border-b border-border">
              <div className="space-y-4">
                <Tabs value={orderSide} onValueChange={(value) => setOrderSide(value as 'buy' | 'sell')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy" className="data-[state=active]:bg-bull-green data-[state=active]:text-black">
                      Buy
                    </TabsTrigger>
                    <TabsTrigger value="sell" className="data-[state=active]:bg-bear-red data-[state=active]:text-white">
                      Sell
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limit">Limit</SelectItem>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="stop">Stop</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Limit price</label>
                    <div className="relative">
                      <Input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="pr-12 font-mono"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">USDT</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Quantity</label>
                    <div className="relative">
                      <Input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="pr-12 font-mono"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">BTC</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">25%</Button>
                    <Button variant="outline" size="sm" className="flex-1">50%</Button>
                    <Button variant="outline" size="sm" className="flex-1">75%</Button>
                    <Button variant="outline" size="sm" className="flex-1">100%</Button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Post only</span>
                    <Button variant="outline" size="sm">Reduce only</Button>
                  </div>

                  <Separator />

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time in force</span>
                      <span>GTC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. total</span>
                      <span className="font-mono">5.41 USDT</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full py-3 font-semibold ${
                      orderSide === 'buy' 
                        ? 'bg-bull-green hover:bg-bull-green/90 text-black' 
                        : 'bg-bear-red hover:bg-bear-red/90 text-white'
                    }`}
                  >
                    {orderSide === 'buy' ? 'Buy' : 'Sell'} {currentPair.baseAsset}
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Book */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Order book</h3>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                    <span>Price</span>
                    <span className="text-right">Quantity</span>
                    <span className="text-right">Total</span>
                  </div>

                  {/* Asks (Sell orders) */}
                  <div className="space-y-1">
                    {orderBookAsks.reverse().map((ask, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-bear-red/10 cursor-pointer">
                        <span className="text-bear-red font-mono">{ask.price.toFixed(1)}</span>
                        <span className="text-right font-mono">{ask.quantity.toFixed(5)}</span>
                        <span className="text-right font-mono text-muted-foreground">{ask.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Spread */}
                  <div className="py-2 text-center border-y border-border/50">
                    <div className="text-lg font-mono font-bold text-bull-green">
                      {currentPair.price.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">Spread: 1.5</div>
                  </div>

                  {/* Bids (Buy orders) */}
                  <div className="space-y-1">
                    {orderBookBids.map((bid, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-bull-green/10 cursor-pointer">
                        <span className="text-bull-green font-mono">{bid.price.toFixed(1)}</span>
                        <span className="text-right font-mono">{bid.quantity.toFixed(5)}</span>
                        <span className="text-right font-mono text-muted-foreground">{bid.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Market Trades */}
            <div className="border-t border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Market trades</h3>
              </div>
              <div className="space-y-1">
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <span>Price</span>
                  <span className="text-right">Quantity</span>
                  <span className="text-right">Time</span>
                </div>
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2 text-xs py-1">
                    <span className={i % 2 === 0 ? 'text-bull-green' : 'text-bear-red'}>
                      {(currentPair.price + (Math.random() - 0.5) * 100).toFixed(1)}
                    </span>
                    <span className="text-right font-mono">0.00{Math.floor(Math.random() * 999) + 100}</span>
                    <span className="text-right text-muted-foreground">
                      {new Date().toLocaleTimeString().slice(0, 5)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TradingTerminal;