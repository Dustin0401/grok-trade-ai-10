import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ArrowUpRight, 
  TrendingUp, 
  Search, 
  Menu, 
  ChevronDown,
  Shield,
  Zap,
  Globe,
  Lock,
  Users,
  BarChart3,
  Star,
  Clock,
  CheckCircle,
  TrendingDown,
  Activity,
  DollarSign,
  PieChart,
  Smartphone,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStat, setCurrentStat] = useState(0);

  // Animated statistics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const marketData = [
    { rank: 1, name: "Ethereum", symbol: "ETH", price: "$2860.54", change: "-1.93%", volume: "650.06K", chartColor: "green" },
    { rank: 2, name: "Solana", symbol: "SOL", price: "$186", change: "-0.60%", volume: "64.1M", chartColor: "red" },
    { rank: 3, name: "USD Coin", symbol: "USDC", price: "$1.00", change: "+0.01%", volume: "177.9M", chartColor: "green" },
    { rank: 4, name: "Dai", symbol: "DAI", price: "$122.38", change: "-2.10%", volume: "248.06K", chartColor: "red" },
    { rank: 5, name: "MARL", symbol: "MARL", price: "$0.022", change: "+0.68%", volume: "21.1M", chartColor: "green" },
    { rank: 6, name: "USD Coin", symbol: "USDC", price: "$1.00", change: "+0.01%", volume: "177.9M", chartColor: "green" },
    { rank: 7, name: "Solana", symbol: "SOL", price: "$186", change: "-0.60%", volume: "64.1M", chartColor: "red" },
    { rank: 8, name: "Ethereum", symbol: "ETH", price: "$2860.54", change: "-1.93%", volume: "650.06K", chartColor: "green" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-fuchsia-900/20 to-transparent"></div>
      <div className="absolute inset-0" style={{ background: 'var(--gradient-purple-glow)' }}></div>
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-purple-500/20 glass-card"
        style={{ 
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(180, 80, 255, 0.1) 100%)',
          backdropFilter: 'blur(20px)'
        }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30 terminal-glow">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <span className="text-white font-semibold text-lg">Trading Terminal</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Features</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Docs</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Portfolio</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Terminal</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tokens"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-900/80 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 backdrop-blur-sm"
                />
              </div>
              <Button 
                onClick={() => navigate('/terminal')}
                className="relative color-leak bg-gradient-to-r from-purple-600 to-fuchsia-700 hover:from-purple-700 hover:to-fuchsia-800 text-white font-medium px-6 py-2 rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 terminal-glow"
              >
                Connect Wallet
              </Button>
              <button className="md:hidden text-gray-400">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-24 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 blur-3xl rounded-full scale-150 opacity-40"></div>
          <h1 className="relative text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-fuchsia-100 bg-clip-text text-transparent leading-tight">
            Explore the Market
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Dive into trending tokens, hidden gems, and what's<br />
          moving the on-chain right now.
        </p>
        <Button 
          onClick={() => navigate('/terminal')}
          className="relative color-leak bg-gradient-to-r from-purple-600 to-fuchsia-700 hover:from-purple-700 hover:to-fuchsia-800 text-white font-semibold px-10 py-4 rounded-lg text-lg shadow-xl shadow-purple-500/40 transition-all duration-300 hover:scale-110 terminal-glow"
        >
          Connect Wallet
        </Button>
      </section>

      {/* Market Table */}
      <section className="relative z-10 container mx-auto px-4 mb-24">
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50 bg-gray-800/30">
                  <th className="text-left py-6 px-8 text-gray-400 font-semibold text-sm uppercase tracking-wider">#</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-semibold text-sm uppercase tracking-wider">Token name</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-semibold text-sm uppercase tracking-wider">Price</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-semibold text-sm uppercase tracking-wider">24h</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-semibold text-sm uppercase tracking-wider">Volume</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-semibold text-sm uppercase tracking-wider">24h Chart</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((token, index) => (
                  <tr key={index} className="border-b border-gray-700/30 hover:bg-gray-800/40 transition-all duration-200 group">
                    <td className="py-6 px-8 text-gray-300 font-medium">{token.rank}</td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg terminal-glow">
                          <span className="text-sm font-bold text-white">{token.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-lg">{token.name}</div>
                          <div className="text-gray-400 text-sm font-medium">{token.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8 text-white font-bold text-lg">{token.price}</td>
                    <td className="py-6 px-8">
                      <span className={`font-semibold text-lg ${
                        token.change.startsWith('-') 
                          ? 'text-red-400' 
                          : 'text-green-400'
                      }`}>
                        {token.change}
                      </span>
                    </td>
                    <td className="py-6 px-8 text-gray-200 font-medium">{token.volume}</td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-2">
                        <div className={`w-16 h-8 rounded-md ${
                          token.chartColor === 'green' 
                            ? 'bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30' 
                            : 'bg-gradient-to-r from-red-500/20 to-red-400/20 border border-red-500/30'
                        } flex items-center justify-center`}>
                          <TrendingUp className={`w-4 h-4 ${
                            token.chartColor === 'green' ? 'text-green-400' : 'text-red-400'
                          }`} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 mb-24">
        <div className="text-center mb-20">
          <div className="text-sm text-blue-400 uppercase tracking-widest mb-6 font-semibold">FEATURES</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Built by Traders<br />for Traders
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              number: "01",
              title: "Discover",
              subtitle: "Discover new tokens and filter by your preferences.",
              mockup: "table-view"
            },
            {
              number: "02", 
              title: "Monitor",
              subtitle: "Real-time security updates & easily monitor your portfolio.",
              mockup: "chart-view"
            },
            {
              number: "03",
              title: "Buy and Sell",
              subtitle: "Trade faster with Soda with a speed advantage for every transaction.",
              mockup: "trade-view"
            }
          ].map((feature, index) => (
            <div key={index} className="group">
              <div className="glass-card rounded-2xl p-8 transition-all duration-300 relative">
                <div className="mb-8">
                  <div className="w-full h-64 glass-card rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-fuchsia-500/15"></div>
                    <div className="relative">
                      {feature.mockup === "table-view" && (
                        <div className="space-y-2">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 w-48">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 terminal-glow"></div>
                              <div className="flex-1 h-2 bg-gray-600 rounded"></div>
                              <div className="w-8 h-2 bg-green-500 rounded"></div>
                            </div>
                          ))}
                        </div>
                      )}
                      {feature.mockup === "chart-view" && (
                        <div className="w-48 h-32 relative">
                          <div className="absolute inset-0 flex items-end justify-between">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="w-4 bg-gradient-to-t from-purple-500 to-fuchsia-400 rounded-t terminal-glow"
                                style={{ height: `${20 + Math.random() * 80}%` }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      )}
                      {feature.mockup === "trade-view" && (
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <div className="px-6 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-semibold">Buy</div>
                            <div className="px-6 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm font-semibold">Sell</div>
                          </div>
                          <div className="space-y-2">
                            <div className="w-48 h-3 bg-gray-600 rounded"></div>
                            <div className="w-32 h-3 bg-gray-600 rounded"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-purple-400 mb-3 font-semibold">{feature.number}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-10 container mx-auto px-4 mb-24">
        <div className="glass-card rounded-3xl p-12 relative transition-all duration-300">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Trusted by Traders Worldwide
            </h2>
            <p className="text-xl text-gray-300">Join thousands of traders using our platform daily</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Daily Volume", value: "$2.4B", icon: BarChart3, trend: "+12%" },
              { label: "Active Traders", value: "45K+", icon: Users, trend: "+8%" },
              { label: "Total Transactions", value: "1.2M", icon: Activity, trend: "+15%" },
              { label: "Assets Listed", value: "250+", icon: Globe, trend: "+5%" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`text-center group animate-fade-in ${
                  currentStat === index ? 'animate-scale-in' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="glass-card rounded-2xl p-6 transition-all duration-300 relative">
                  <stat.icon className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:text-purple-300 transition-colors terminal-glow" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 mb-2">{stat.label}</div>
                  <div className="text-green-400 text-sm font-semibold">{stat.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="relative z-10 container mx-auto px-4 mb-24">
        <div className="text-center mb-16">
          <div className="text-sm text-purple-400 uppercase tracking-widest mb-6 font-semibold">SECURITY</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Bank-Grade Security
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your assets are protected with enterprise-level security measures and cutting-edge encryption
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Multi-Layer Protection",
              description: "Advanced encryption and multi-signature wallets protect your assets"
            },
            {
              icon: Lock,
              title: "Cold Storage",
              description: "95% of funds stored in offline, air-gapped cold storage systems"
            },
            {
              icon: Award,
              title: "Compliance",
              description: "Fully regulated and compliant with international financial standards"
            }
          ].map((feature, index) => (
            <div key={index} className="group animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
               <Card className="glass-card p-8 relative color-leak">
                <div className="bg-gradient-to-br from-purple-500/15 to-fuchsia-500/15 border border-purple-500/30 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 terminal-glow">
                  <feature.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Trading Tools Showcase */}
      <section className="relative z-10 container mx-auto px-4 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="text-sm text-purple-400 uppercase tracking-widest mb-6 font-semibold">TRADING TOOLS</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Professional Trading Suite
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Access advanced charting tools, real-time market data, and powerful analytics to make informed trading decisions.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: BarChart3, title: "Advanced Charting", subtitle: "Professional-grade charts with 50+ indicators" },
                { icon: Zap, title: "Lightning Fast Execution", subtitle: "Sub-millisecond order execution speed" },
                { icon: PieChart, title: "Portfolio Analytics", subtitle: "Real-time P&L tracking and risk analysis" }
              ].map((tool, index) => (
                <div key={index} className="flex items-start gap-4 group hover-scale">
                  <div className="bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 rounded-lg p-3 group-hover:border-purple-400/50 transition-all duration-300 terminal-glow">
                    <tool.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{tool.title}</h4>
                    <p className="text-gray-400">{tool.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="glass-card rounded-3xl p-8 relative color-leak">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Live Terminal Preview</h3>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Live</Badge>
              </div>
              
              {/* Mock Terminal Interface */}
              <div className="space-y-4">
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-300 text-sm">BTC/USDT</span>
                    <span className="text-green-400 font-mono font-bold">$67,234.56</span>
                  </div>
                  <div className="h-20 bg-gradient-to-r from-purple-500/15 to-fuchsia-500/15 rounded border border-purple-500/30 flex items-end justify-between p-2">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-gradient-to-t from-purple-500 to-fuchsia-400 rounded-t animate-pulse terminal-glow"
                        style={{ 
                          height: `${30 + Math.random() * 50}%`,
                          animationDelay: `${i * 100}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">24h Volume</div>
                    <div className="text-white font-mono font-bold">2.4M</div>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">24h Change</div>
                    <div className="text-green-400 font-mono font-bold">+2.34%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 container mx-auto px-4 mb-24">
        <div className="text-center mb-16">
          <div className="text-sm text-purple-400 uppercase tracking-widest mb-6 font-semibold">TESTIMONIALS</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            What Traders Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Chen",
              role: "Day Trader",
              content: "The execution speed is incredible. I've never experienced slippage issues, and the advanced charts help me make better decisions.",
              rating: 5
            },
            {
              name: "Michael Rodriguez",
              role: "Crypto Fund Manager",
              content: "Managing multiple portfolios has never been easier. The analytics dashboard gives me everything I need at a glance.",
              rating: 5
            },
            {
              name: "Emma Thompson",
              role: "Swing Trader",
              content: "The security features give me peace of mind. I can focus on trading knowing my assets are protected.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div key={index} className="group animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <Card className="glass-card p-8 relative color-leak">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-purple-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center terminal-glow">
                    <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="relative z-10 container mx-auto px-4 mb-24">
        <div className="glass-card rounded-3xl p-12 relative color-leak transition-all duration-300">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="text-sm text-purple-400 uppercase tracking-widest mb-6 font-semibold">MOBILE APP</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Trade on the Go
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Never miss a trading opportunity with our powerful mobile app. Full trading capabilities in your pocket.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Smartphone, title: "Native iOS & Android" },
                  { icon: Clock, title: "Real-time Notifications" },
                  { icon: CheckCircle, title: "Biometric Security" },
                  { icon: Activity, title: "Live Price Alerts" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 hover-scale">
                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-2">
                      <feature.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-gray-300 font-medium">{feature.title}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4">
                <Button className="relative color-leak bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 terminal-glow">
                  Download for iOS
                </Button>
                <Button variant="outline" className="glass-card border-purple-500/30 text-purple-400 hover:bg-purple-500/15 font-semibold px-6 py-3 rounded-lg transition-all duration-300">
                  Download for Android
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="relative max-w-sm mx-auto">
                <div className="glass-card rounded-3xl p-6 shadow-2xl relative color-leak">
                  <div className="bg-gray-800 rounded-2xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-semibold">Portfolio</span>
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">$24,567.89</div>
                    <div className="text-green-400 text-sm">+5.67% Today</div>
                  </div>
                  
                  <div className="space-y-2">
                    {['BTC', 'ETH', 'SOL'].map((symbol, i) => (
                      <div key={symbol} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center terminal-glow">
                            <span className="text-xs font-bold text-white">{symbol.charAt(0)}</span>
                          </div>
                          <span className="text-white font-medium">{symbol}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">${(Math.random() * 1000).toFixed(2)}</div>
                          <div className={`text-xs ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 5).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-sm text-purple-400 uppercase tracking-widest mb-8 font-semibold">GET STARTED</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-100 to-fuchsia-100 bg-clip-text text-transparent leading-tight">
            Start Trading In Less<br />Than 30 Secs
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">Install Phantom and connect your wallet to log in.</p>
          <p className="text-sm text-gray-400 mb-12">
            By connecting, I agree to the <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors underline">Terms of Use</a>
          </p>
          <Button 
            onClick={() => navigate('/terminal')}
            className="relative color-leak bg-gradient-to-r from-purple-600 to-fuchsia-700 hover:from-purple-700 hover:to-fuchsia-800 text-white font-semibold px-12 py-4 rounded-lg text-lg shadow-xl shadow-purple-500/40 transition-all duration-300 hover:scale-110 terminal-glow"
          >
            Connect Wallet
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 py-12 glass-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="font-medium">© Acraba designer 2025</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors font-medium">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;