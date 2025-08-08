import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TrendingUp, TrendingDown, ShoppingCart, Zap, Clock, Shield, Target, Layers, Bot, Brain, Sparkles, BarChart3, AlertTriangle, DollarSign } from "lucide-react";

const TradingInterface = () => {
  const [orderType, setOrderType] = useState("market");
  const [side, setSide] = useState("buy");
  const [symbol, setSymbol] = useState("AAPL");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  
  // Advanced trading states
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [leverage, setLeverage] = useState([1]);
  const [marginEnabled, setMarginEnabled] = useState(false);
  const [autoRebalance, setAutoRebalance] = useState(false);
  const [portfolioPercent, setPortfolioPercent] = useState([5]);
  
  // AI Assistant states
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([
    { type: "Buy", symbol: "NVDA", confidence: 85, reason: "Strong Q4 earnings and AI growth" },
    { type: "Sell", symbol: "META", confidence: 72, reason: "Overbought conditions detected" },
    { type: "Hold", symbol: "AAPL", confidence: 68, reason: "Awaiting Fed decision impact" }
  ]);

  const currentPrice = 180.75;
  const grokBalance = 1245.67;

  // Calculate estimated cost and Grok tokens needed
  const estimatedCost = quantity && !isNaN(Number(quantity)) 
    ? Number(quantity) * (orderType === "market" ? currentPrice : (Number(price) || currentPrice))
    : 0;

  const grokNeeded = estimatedCost / 145.30; // Mock GROK to USD rate

  const recentOrders = [
    { id: "1", symbol: "AAPL", type: "Buy", quantity: 10, price: 179.50, status: "Filled", time: "14:32" },
    { id: "2", symbol: "GOOGL", type: "Sell", quantity: 5, price: 142.25, status: "Filled", time: "14:15" },
    { id: "3", symbol: "MSFT", type: "Buy", quantity: 8, price: 375.00, status: "Pending", time: "14:10" },
  ];

  const handleSubmitOrder = () => {
    console.log("Order submitted:", { orderType, side, symbol, quantity, price });
    // Here would be the actual order submission logic
  };

  const handleAiQuery = async () => {
    setAiLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setAiResponse(`Based on current market analysis for ${aiQuery || "your portfolio"}, I recommend focusing on tech stocks with strong fundamentals. Consider DCA strategy for long-term positions and maintain 20% cash for opportunities.`);
      setAiLoading(false);
    }, 2000);
  };

  const applyAiSuggestion = (suggestion: any) => {
    setSide(suggestion.type.toLowerCase());
    setSymbol(suggestion.symbol);
    setQuantity("10"); // Default quantity
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Order Entry */}
      <Card className="lg:col-span-3 gradient-card border border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Place Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="spot" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="spot">Spot Trading</TabsTrigger>
              <TabsTrigger value="limit">Advanced</TabsTrigger>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            </TabsList>
            
            <TabsContent value="spot" className="space-y-6">
              {/* Buy/Sell Toggle */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={side === "buy" ? "default" : "outline"}
                  onClick={() => setSide("buy")}
                  className={side === "buy" ? "bg-bull hover:bg-bull/80 text-white" : "border-bull text-bull hover:bg-bull/20"}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy
                </Button>
                <Button
                  variant={side === "sell" ? "default" : "outline"}
                  onClick={() => setSide("sell")}
                  className={side === "sell" ? "bg-bear hover:bg-bear/80 text-white" : "border-bear text-bear hover:bg-bear/20"}
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Sell
                </Button>
              </div>

              {/* Order Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Order Type</label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Market Order
                      </div>
                    </SelectItem>
                    <SelectItem value="limit">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Limit Order
                      </div>
                    </SelectItem>
                    <SelectItem value="stop">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Stop Loss
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Symbol and Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Symbol</label>
                  <Input 
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="e.g., AAPL"
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input 
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Number of shares"
                  />
                </div>
              </div>

              {/* Price (for limit orders) */}
              {orderType === "limit" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Limit Price</label>
                  <Input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={`Current: $${currentPrice}`}
                    className="font-mono"
                  />
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Price:</span>
                    <span className="font-mono">${currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Cost:</span>
                    <span className="font-mono">${estimatedCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grok Tokens Needed:</span>
                    <span className="font-mono text-grok">{grokNeeded.toFixed(2)} GROK</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Balance:</span>
                    <span className="font-mono text-grok">{grokBalance} GROK</span>
                  </div>
                  {grokNeeded > grokBalance && (
                    <Badge variant="destructive" className="w-full justify-center">
                      Insufficient Grok Balance
                    </Badge>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmitOrder}
                disabled={!quantity || grokNeeded > grokBalance}
                className={`w-full ${
                  side === "buy" 
                    ? "bg-bull hover:bg-bull/80" 
                    : "bg-bear hover:bg-bear/80"
                }`}
              >
                {side === "buy" ? "Buy" : "Sell"} {symbol}
              </Button>
            </TabsContent>

            <TabsContent value="limit" className="space-y-6">
              {/* Advanced Order Types */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={side === "buy" ? "default" : "outline"}
                  onClick={() => setSide("buy")}
                  className={side === "buy" ? "bg-bull hover:bg-bull/80 text-white" : "border-bull text-bull hover:bg-bull/20"}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy
                </Button>
                <Button
                  variant={side === "sell" ? "default" : "outline"}
                  onClick={() => setSide("sell")}
                  className={side === "sell" ? "bg-bear hover:bg-bear/80 text-white" : "border-bear text-bear hover:bg-bear/20"}
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Sell
                </Button>
              </div>

              {/* Symbol and Advanced Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Symbol</label>
                  <Input 
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="e.g., AAPL"
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input 
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Number of shares"
                  />
                </div>
              </div>

              {/* Price and Stop Loss */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Entry Price</label>
                  <Input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={`Current: $${currentPrice}`}
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Stop Loss
                  </label>
                  <Input 
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    placeholder="Stop price"
                    className="font-mono"
                  />
                </div>
              </div>

              {/* Take Profit and Portfolio Allocation */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Take Profit
                  </label>
                  <Input 
                    type="number"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    placeholder="Target price"
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Portfolio % ({portfolioPercent[0]}%)</label>
                  <Slider
                    value={portfolioPercent}
                    onValueChange={setPortfolioPercent}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Leverage and Margin */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Leverage ({leverage[0]}x)
                  </label>
                  <Slider
                    value={leverage}
                    onValueChange={setLeverage}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Margin Trading</label>
                    <Switch checked={marginEnabled} onCheckedChange={setMarginEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto Rebalance</label>
                    <Switch checked={autoRebalance} onCheckedChange={setAutoRebalance} />
                  </div>
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Risk Analysis
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Max Loss:</span>
                      <span className="text-bear font-mono">
                        ${stopLoss && quantity ? ((Number(price) || currentPrice) - Number(stopLoss)) * Number(quantity) : 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Gain:</span>
                      <span className="text-bull font-mono">
                        ${takeProfit && quantity ? (Number(takeProfit) - (Number(price) || currentPrice)) * Number(quantity) : "∞"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Risk/Reward:</span>
                      <span className="font-mono">
                        {stopLoss && takeProfit && price ? 
                          ((Number(takeProfit) - (Number(price) || currentPrice)) / ((Number(price) || currentPrice) - Number(stopLoss))).toFixed(2) : 
                          "N/A"
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Margin Req:</span>
                      <span className="font-mono">
                        ${marginEnabled && quantity ? (estimatedCost / leverage[0]).toFixed(2) : estimatedCost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Submit Button */}
              <Button 
                onClick={handleSubmitOrder}
                disabled={!quantity}
                className={`w-full ${
                  side === "buy" 
                    ? "bg-bull hover:bg-bull/80" 
                    : "bg-bear hover:bg-bear/80"
                }`}
              >
                Place Advanced {side === "buy" ? "Buy" : "Sell"} Order
              </Button>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              {/* AI Query Input */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">AI Trading Assistant</h3>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ask your trading question</label>
                  <Textarea
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="e.g., What are the best stocks to buy in the current market conditions?"
                    className="min-h-[80px]"
                  />
                </div>
                
                <Button 
                  onClick={handleAiQuery}
                  disabled={aiLoading}
                  className="w-full bg-primary hover:bg-primary/80"
                >
                  {aiLoading ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      AI Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get AI Analysis
                    </>
                  )}
                </Button>
              </div>

              {/* AI Response */}
              {aiResponse && (
                <div className="bg-muted/30 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    AI Analysis
                  </h4>
                  <p className="text-sm leading-relaxed">{aiResponse}</p>
                </div>
              )}

              {/* AI Suggestions */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Recommendations
                </h4>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary"
                            className={`${
                              suggestion.type === "Buy" ? "bg-bull/20 text-bull" :
                              suggestion.type === "Sell" ? "bg-bear/20 text-bear" :
                              "bg-warning/20 text-warning"
                            }`}
                          >
                            {suggestion.type}
                          </Badge>
                          <span className="font-semibold font-mono">{suggestion.symbol}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {suggestion.confidence}% confidence
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => applyAiSuggestion(suggestion)}
                            className="text-xs h-7"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Sentiment */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Market Sentiment Analysis
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-bull">68%</div>
                    <div className="text-xs text-muted-foreground">Bullish</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-warning">22%</div>
                    <div className="text-xs text-muted-foreground">Neutral</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-bear">10%</div>
                    <div className="text-xs text-muted-foreground">Bearish</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Portfolio Optimize
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Risk Assessment
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card className="gradient-card border border-border/30">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-sm">{order.symbol}</h4>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`text-xs ${
                      order.status === "Filled" 
                        ? "bg-bull/20 text-bull" 
                        : "bg-warning/20 text-warning"
                    }`}
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className={order.type === "Buy" ? "text-bull" : "text-bear"}>
                    {order.type} {order.quantity}
                  </span>
                  <span className="font-mono">${order.price}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingInterface;