import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CandlestickChart,
  LineChart,
  BarChart3,
  Activity,
  Layers,
  Target,
  Zap,
  Volume2,
  Eye,
  TrendingUp,
  TrendingDown,
  Settings,
  Maximize2,
  Grid3X3
} from 'lucide-react';

interface ChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface AdvancedChartProps {
  symbol: string;
  price: number;
  change24h: number;
  className?: string;
}

const AdvancedChart = ({ symbol, price, change24h, className }: AdvancedChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('15m');
  const [chartType, setChartType] = useState('candlestick');
  const [showVolume, setShowVolume] = useState(true);
  const [showIndicators, setShowIndicators] = useState(false);

  const timeframes = ['1s', '5m', '15m', '1h', '4h', '1d', '1w'];
  
  const generateMockData = (): ChartData[] => {
    const data: ChartData[] = [];
    const basePrice = price;
    let currentPrice = basePrice;
    
    for (let i = 0; i < 100; i++) {
      const timestamp = Date.now() - (100 - i) * 60000;
      const volatility = basePrice * 0.002; // 0.2% volatility
      
      const open = currentPrice;
      const change = (Math.random() - 0.5) * volatility;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * volatility * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * 0.5;
      const volume = Math.random() * 1000000;
      
      data.push({ timestamp, open, high, low, close, volume });
      currentPrice = close;
    }
    
    return data;
  };

  const renderChart = () => {
    if (!chartRef.current) return;

    const data = generateMockData();
    const width = chartRef.current.clientWidth;
    const height = chartRef.current.clientHeight - (showVolume ? 80 : 0);
    
    const minPrice = Math.min(...data.map(d => d.low));
    const maxPrice = Math.max(...data.map(d => d.high));
    const priceRange = maxPrice - minPrice;
    const padding = priceRange * 0.1;

    const scaleY = (price: number) => {
      return height - ((price - minPrice + padding) / (priceRange + 2 * padding)) * height;
    };

    const scaleX = (index: number) => {
      return (index / (data.length - 1)) * width;
    };

    let chartElements = '';

    if (chartType === 'candlestick') {
      chartElements = data.map((candle, index) => {
        const x = scaleX(index);
        const openY = scaleY(candle.open);
        const closeY = scaleY(candle.close);
        const highY = scaleY(candle.high);
        const lowY = scaleY(candle.low);
        const isGreen = candle.close > candle.open;
        const bodyHeight = Math.abs(closeY - openY);
        const bodyY = Math.min(openY, closeY);
        const candleWidth = Math.max(2, width / data.length * 0.8);

        return `
          <!-- Wick -->
          <line x1="${x}" y1="${highY}" x2="${x}" y2="${lowY}" 
                stroke="${isGreen ? 'hsl(var(--bull-green))' : 'hsl(var(--bear-red))'}" 
                stroke-width="1" opacity="0.8"/>
          <!-- Body -->
          <rect x="${x - candleWidth/2}" y="${bodyY}" width="${candleWidth}" height="${Math.max(1, bodyHeight)}" 
                fill="${isGreen ? 'hsl(var(--bull-green))' : 'hsl(var(--bear-red))'}" 
                opacity="0.9" rx="1"/>
        `;
      }).join('');
    } else if (chartType === 'line') {
      const pathData = data.map((candle, index) => {
        const x = scaleX(index);
        const y = scaleY(candle.close);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');

      chartElements = `
        <path d="${pathData}" 
              stroke="hsl(var(--primary))" 
              stroke-width="2" 
              fill="none" 
              opacity="0.9"/>
        <path d="${pathData} L ${width} ${height} L 0 ${height} Z" 
              fill="url(#priceGradient)" 
              opacity="0.2"/>
      `;
    }

    // Volume bars
    let volumeElements = '';
    if (showVolume) {
      const maxVolume = Math.max(...data.map(d => d.volume));
      const volumeHeight = 60;
      const volumeY = height + 20;

      volumeElements = data.map((candle, index) => {
        const x = scaleX(index);
        const volHeight = (candle.volume / maxVolume) * volumeHeight;
        const barWidth = Math.max(1, width / data.length * 0.6);
        const isGreen = candle.close > candle.open;

        return `
          <rect x="${x - barWidth/2}" y="${volumeY + volumeHeight - volHeight}" 
                width="${barWidth}" height="${volHeight}" 
                fill="${isGreen ? 'hsl(var(--bull-green))' : 'hsl(var(--bear-red))'}" 
                opacity="0.6"/>
        `;
      }).join('');
    }

    // Grid lines
    const gridLines = `
      ${Array.from({length: 10}, (_, i) => {
        const y = (height / 9) * i;
        return `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="hsl(var(--border))" stroke-width="0.5" opacity="0.3"/>`;
      }).join('')}
      ${Array.from({length: 10}, (_, i) => {
        const x = (width / 9) * i;
        return `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="hsl(var(--border))" stroke-width="0.5" opacity="0.3"/>`;
      }).join('')}
    `;

    // Current price line
    const currentPriceY = scaleY(price);
    const currentPriceLine = `
      <line x1="0" y1="${currentPriceY}" x2="${width}" y2="${currentPriceY}" 
            stroke="hsl(var(--primary))" stroke-width="2" opacity="0.8" stroke-dasharray="5,5"/>
      <rect x="${width - 80}" y="${currentPriceY - 12}" width="75" height="24" 
            fill="hsl(var(--primary))" rx="4" opacity="0.9"/>
      <text x="${width - 42}" y="${currentPriceY + 4}" text-anchor="middle" 
            fill="white" font-size="12" font-weight="600">
        ${price.toFixed(2)}
      </text>
    `;

    chartRef.current.innerHTML = `
      <svg class="w-full h-full" viewBox="0 0 ${width} ${height + (showVolume ? 100 : 0)}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:hsl(var(--primary));stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:hsl(var(--primary));stop-opacity:0" />
          </linearGradient>
        </defs>
        
        ${gridLines}
        ${chartElements}
        ${currentPriceLine}
        ${volumeElements}
      </svg>
    `;
  };

  useEffect(() => {
    const handleResize = () => renderChart();
    renderChart();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chartType, showVolume, selectedTimeframe, price]);

  return (
    <Card className={`h-full bg-gradient-to-br from-card/95 to-card/90 backdrop-blur-xl border-primary/20 ${className}`}>
      {/* Chart Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
              <CandlestickChart className="w-3 h-3 mr-1" />
              {symbol}
            </Badge>
            <div className="text-2xl font-bold font-mono text-foreground">
              ${price.toLocaleString()}
            </div>
            <Badge className={`${change24h >= 0 ? 'bg-bull-green/20 text-bull-green' : 'bg-bear-red/20 text-bear-red'}`}>
              {change24h >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowIndicators(!showIndicators)}
            className={showIndicators ? 'bg-primary/20 border-primary/40' : ''}
          >
            <Layers className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Target className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="flex items-center justify-between p-3 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-4">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTimeframe(tf)}
                className={`text-xs px-3 py-1 h-7 ${
                  selectedTimeframe === tf 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-muted/50'
                }`}
              >
                {tf}
              </Button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Chart Type Selector */}
          <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChartType('candlestick')}
              className={`h-7 ${chartType === 'candlestick' ? 'bg-primary text-primary-foreground' : ''}`}
            >
              <CandlestickChart className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChartType('line')}
              className={`h-7 ${chartType === 'line' ? 'bg-primary text-primary-foreground' : ''}`}
            >
              <LineChart className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChartType('bar')}
              className={`h-7 ${chartType === 'bar' ? 'bg-primary text-primary-foreground' : ''}`}
            >
              <BarChart3 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowVolume(!showVolume)}
            className={`text-xs ${showVolume ? 'bg-primary/20 border-primary/40' : ''}`}
          >
            <Volume2 className="w-3 h-3 mr-1" />
            Volume
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Grid3X3 className="w-3 h-3 mr-1" />
            Grid
          </Button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 p-4">
        <div 
          ref={chartRef}
          className="w-full h-full min-h-[400px] bg-gradient-to-br from-background/50 to-muted/20 rounded-lg border border-border/30 relative overflow-hidden"
        />
      </div>

      {/* Technical Indicators Panel */}
      {showIndicators && (
        <div className="border-t border-border/50 p-4 bg-muted/10">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">RSI(14):</span>
              <span className="font-mono text-bull-green">52.34</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">MACD:</span>
              <span className="font-mono text-bear-red">-123.45</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">BB:</span>
              <span className="font-mono text-primary">89,234 - 91,456</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Vol:</span>
              <span className="font-mono text-foreground">2.34M</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AdvancedChart;