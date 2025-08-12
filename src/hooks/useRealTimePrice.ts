import { useState, useEffect, useCallback } from 'react';

export interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  lastUpdate: number;
}

interface UseRealTimePriceOptions {
  symbols: string[];
  updateInterval?: number;
  volatility?: number;
}

export const useRealTimePrice = ({
  symbols,
  updateInterval = 1000,
  volatility = 0.002
}: UseRealTimePriceOptions) => {
  const [prices, setPrices] = useState<Record<string, PriceData>>(() => {
    // Initialize with mock data
    const initialPrices: Record<string, PriceData> = {};
    symbols.forEach(symbol => {
      const basePrice = getBasePriceForSymbol(symbol);
      initialPrices[symbol] = {
        symbol,
        price: basePrice,
        change24h: (Math.random() - 0.5) * 10,
        volume24h: Math.random() * 100000000,
        high24h: basePrice * (1 + Math.random() * 0.05),
        low24h: basePrice * (1 - Math.random() * 0.05),
        lastUpdate: Date.now()
      };
    });
    return initialPrices;
  });

  const [isConnected, setIsConnected] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected');

  // Simulate price movements
  const updatePrices = useCallback(() => {
    setPrices(prevPrices => {
      const newPrices = { ...prevPrices };
      
      symbols.forEach(symbol => {
        if (newPrices[symbol]) {
          const currentPrice = newPrices[symbol].price;
          const changeAmount = currentPrice * volatility * (Math.random() - 0.5) * 2;
          const newPrice = Math.max(currentPrice + changeAmount, 0.0001);
          
          // Update 24h metrics occasionally
          const shouldUpdateMetrics = Math.random() < 0.1;
          
          newPrices[symbol] = {
            ...newPrices[symbol],
            price: newPrice,
            change24h: shouldUpdateMetrics 
              ? newPrices[symbol].change24h + (Math.random() - 0.5) * 0.5
              : newPrices[symbol].change24h,
            volume24h: shouldUpdateMetrics
              ? newPrices[symbol].volume24h + Math.random() * 1000000
              : newPrices[symbol].volume24h,
            high24h: Math.max(newPrices[symbol].high24h, newPrice),
            low24h: Math.min(newPrices[symbol].low24h, newPrice),
            lastUpdate: Date.now()
          };
        }
      });
      
      return newPrices;
    });
  }, [symbols, volatility]);

  // Simulate connection status changes
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      // Randomly simulate connection issues (5% chance)
      if (Math.random() < 0.05) {
        setConnectionStatus('connecting');
        setIsConnected(false);
        
        setTimeout(() => {
          setConnectionStatus('connected');
          setIsConnected(true);
        }, 2000 + Math.random() * 3000);
      }
    }, 30000);

    return () => clearInterval(connectionInterval);
  }, []);

  // Main price update loop
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(updatePrices, updateInterval);
    return () => clearInterval(interval);
  }, [updatePrices, updateInterval, isConnected]);

  // Subscribe to new symbol
  const subscribe = useCallback((symbol: string) => {
    if (!prices[symbol]) {
      const basePrice = getBasePriceForSymbol(symbol);
      setPrices(prev => ({
        ...prev,
        [symbol]: {
          symbol,
          price: basePrice,
          change24h: (Math.random() - 0.5) * 10,
          volume24h: Math.random() * 100000000,
          high24h: basePrice * (1 + Math.random() * 0.05),
          low24h: basePrice * (1 - Math.random() * 0.05),
          lastUpdate: Date.now()
        }
      }));
    }
  }, [prices]);

  // Unsubscribe from symbol
  const unsubscribe = useCallback((symbol: string) => {
    setPrices(prev => {
      const newPrices = { ...prev };
      delete newPrices[symbol];
      return newPrices;
    });
  }, []);

  return {
    prices,
    isConnected,
    connectionStatus,
    subscribe,
    unsubscribe,
    refresh: updatePrices
  };
};

// Helper function to get realistic base prices for different symbols
function getBasePriceForSymbol(symbol: string): number {
  const basePrices: Record<string, number> = {
    'BTC/USDT': 45000,
    'ETH/USDT': 2800,
    'GROK/USDT': 0.245,
    'SOL/USDT': 89.45,
    'ADA/USDT': 0.58,
    'DOT/USDT': 7.89,
    'AVAX/USDT': 34.21,
    'LINK/USDT': 15.67,
    'MATIC/USDT': 0.89,
    'UNI/USDT': 6.78,
    'AAPL': 180.75,
    'MSFT': 375.20,
    'GOOGL': 142.50,
    'TSLA': 245.60,
    'NVDA': 890.45
  };

  return basePrices[symbol] || basePrices[symbol.replace('/', '/USDT')] || Math.random() * 100 + 10;
}