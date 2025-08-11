import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ChevronRight, 
  Check, 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3,
  Wallet,
  Users,
  Star,
  ArrowUpRight,
  Play,
  Activity,
  Globe,
  Lock,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = duration / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  delay?: number;
}) => (
  <Card 
    className="group p-8 bg-surface/40 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-primary relative overflow-hidden"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary p-3 mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-full h-full text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-gradient transition-all duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  </Card>
);

const StatCard = ({ 
  value, 
  label, 
  icon: Icon, 
  delay = 0 
}: { 
  value: string; 
  label: string; 
  icon: any; 
  delay?: number;
}) => (
  <div 
    className="text-center animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary p-4">
      <Icon className="w-full h-full text-white" />
    </div>
    <div className="text-3xl font-bold text-gradient mb-2">{value}</div>
    <div className="text-muted-foreground">{label}</div>
  </div>
);

const Homepage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const marketData = [
    { rank: 1, name: "Ethereum", symbol: "ETH", price: "$3,265.74", change: "+1.07%", volume: "$62.0M", up: true },
    { rank: 2, name: "Tether", symbol: "USDT", price: "$1.00", change: "+0.00%", volume: "$461M", up: true },
    { rank: 3, name: "USD Coin", symbol: "USDC", price: "$1.00", change: "+0.01%", volume: "$179M", up: true },
    { rank: 4, name: "BNB", symbol: "BNB", price: "$372.38", change: "-0.30%", volume: "$248.0M", up: false },
    { rank: 5, name: "Solana", symbol: "SOL", price: "$98.45", change: "+2.15%", volume: "$125M", up: true },
    { rank: 6, name: "Polygon", symbol: "MATIC", price: "$0.8734", change: "+3.42%", volume: "$89.2M", up: true },
    { rank: 7, name: "Chainlink", symbol: "LINK", price: "$14.87", change: "-1.25%", volume: "$156M", up: false },
    { rank: 8, name: "Uniswap", symbol: "UNI", price: "$7.23", change: "+4.18%", volume: "$78.5M", up: true },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Real-time market data with AI-powered insights and predictive analytics for smarter trading decisions."
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Multi-layer security protocols with hardware wallet integration and advanced encryption."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second execution times with direct blockchain integration and optimized trading algorithms."
    },
    {
      icon: BarChart3,
      title: "Professional Tools",
      description: "Complete trading suite with advanced charting, portfolio management, and risk assessment."
    },
    {
      icon: Globe,
      title: "Multi-Chain Support",
      description: "Trade across multiple blockchains with unified portfolio management and cross-chain analytics."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of traders sharing insights, strategies, and real-time market intelligence."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Helmet>
        <title>Grok Terminal - Advanced Web3 Trading Platform</title>
        <meta
          name="description"
          content="Professional crypto trading terminal with advanced analytics, multi-chain support, and institutional-grade security. Trade smarter with AI-powered insights."
        />
        <link rel="canonical" href="/" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Grok Terminal",
            "url": "/",
            "description": "Advanced Web3 Trading Platform",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}</script>
      </Helmet>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 to-transparent rounded-full animate-glow" />
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-background/60 border-b border-primary/20">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-2 shadow-primary">
                <Sparkles className="w-full h-full text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-gradient">
                Grok Terminal
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a className="text-muted-foreground hover:text-primary transition-colors font-medium" href="#">Trading</a>
              <a className="text-muted-foreground hover:text-primary transition-colors font-medium" href="#">Analytics</a>
              <a className="text-muted-foreground hover:text-primary transition-colors font-medium" href="#">Portfolio</a>
              <a className="text-muted-foreground hover:text-primary transition-colors font-medium" href="#">DeFi</a>
            </nav>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <a className="text-muted-foreground hover:text-primary transition-colors font-medium" href="#">DeFi Pools</a>
            <a className="text-muted-foreground hover:text-primary transition-colors font-medium" href="#">NFT Trading</a>
            <a className="text-muted-foreground hover:text-primary transition-colors font-medium" href="#">Yield Farming</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden md:flex border-primary/30 text-primary hover:bg-primary/10"
            >
              <Activity className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button
              onClick={() => navigate("/terminal")}
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 h-12 rounded-full shadow-primary hover:shadow-primary/80 transition-all duration-300"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <Badge className="mb-8 bg-primary/10 border-primary/30 text-primary px-6 py-2 text-sm font-medium">
                🚀 Next-Gen Trading Platform
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                Trade the Future of{" "}
                <span className="text-gradient bg-gradient-animated bg-[length:400%_400%]">
                  Web3 Finance
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Professional-grade trading terminal with AI-powered analytics, 
                multi-chain support, and institutional security for the next generation of traders.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                <Button
                  onClick={() => navigate("/terminal")}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-hero hover:shadow-primary/60 transition-all duration-300 group"
                >
                  <Wallet className="w-5 h-5 mr-3" />
                  Start Trading Now
                  <ArrowUpRight className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
                
                <Button
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-4 rounded-full text-lg font-semibold group"
                >
                  <Play className="w-5 h-5 mr-3" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-4xl mx-auto">
                <StatCard value="$2.5B+" label="Trading Volume" icon={TrendingUp} delay={200} />
                <StatCard value="50K+" label="Active Traders" icon={Users} delay={400} />
                <StatCard value="99.9%" label="Uptime" icon={Shield} delay={600} />
                <StatCard value="15+" label="Blockchains" icon={Globe} delay={800} />
              </div>
            </div>
          </div>
        </section>

        {/* Live Market Data */}
        <section className="py-16 bg-surface/20 backdrop-blur-xl">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-3 h-3 bg-bull-green rounded-full animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">LIVE MARKET DATA</span>
              </div>
              <h2 className="text-3xl font-bold text-gradient">Real-Time Trading Opportunities</h2>
            </div>

            <Card className="bg-surface/40 backdrop-blur-xl border-primary/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="px-6 py-4 text-left text-muted-foreground font-medium">#</th>
                      <th className="px-6 py-4 text-left text-muted-foreground font-medium">Asset</th>
                      <th className="px-6 py-4 text-left text-muted-foreground font-medium">Price</th>
                      <th className="px-6 py-4 text-left text-muted-foreground font-medium">24h Change</th>
                      <th className="px-6 py-4 text-left text-muted-foreground font-medium">Volume</th>
                      <th className="px-6 py-4 text-left text-muted-foreground font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketData.map((asset, index) => (
                      <tr 
                        key={asset.rank} 
                        className="border-b border-primary/10 hover:bg-primary/5 transition-colors group"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="px-6 py-5 text-muted-foreground">{asset.rank}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-2">
                              <span className="text-white font-bold text-xs">{asset.symbol[0]}</span>
                            </div>
                            <div>
                              <div className="font-semibold">{asset.name}</div>
                              <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 font-mono font-semibold">{asset.price}</td>
                        <td className={`px-6 py-5 font-semibold ${asset.up ? "text-bull-green" : "text-bear-red"}`}>
                          {asset.change}
                        </td>
                        <td className="px-6 py-5 text-muted-foreground font-mono">{asset.volume}</td>
                        <td className="px-6 py-5">
                          <Button 
                            size="sm" 
                            className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                            onClick={() => navigate("/terminal")}
                          >
                            Trade
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-secondary/10 border-secondary/30 text-secondary px-6 py-2 text-sm font-medium">
                FEATURES
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Built for Professional Traders
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to trade, analyze, and profit in the decentralized finance ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Security & Trust Section */}
        <section className="py-24 bg-surface/10 backdrop-blur-xl">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-primary/10 border-primary/30 text-primary px-6 py-2 text-sm font-medium">
                SECURITY FIRST
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">
                Institutional-Grade Security
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your assets are protected by the highest security standards in the industry.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 bg-surface/40 backdrop-blur-xl border-primary/20 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary p-4">
                  <Shield className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gradient">Multi-Sig Wallets</h3>
                <p className="text-muted-foreground">Advanced multi-signature technology ensures your funds are always secure.</p>
              </Card>

              <Card className="p-8 bg-surface/40 backdrop-blur-xl border-primary/20 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary p-4">
                  <Lock className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gradient">End-to-End Encryption</h3>
                <p className="text-muted-foreground">Military-grade encryption protects all your transactions and data.</p>
              </Card>

              <Card className="p-8 bg-surface/40 backdrop-blur-xl border-primary/20 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary p-4">
                  <Check className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gradient">Smart Contract Audited</h3>
                <p className="text-muted-foreground">All smart contracts are audited by leading security firms.</p>
              </Card>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-bull-green" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-bull-green" />
                  <span>ISO 27001 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-bull-green" />
                  <span>CCSS Level 3</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Rewards Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-xl animate-glow" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center mb-8">
                <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 text-primary px-8 py-3 text-sm font-medium backdrop-blur-xl animate-pulse">
                  <Sparkles className="w-4 h-4 mr-2" />
                  REWARDS PROGRAM
                </Badge>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                <span className="text-gradient bg-gradient-animated bg-[length:400%_400%] animate-slide-up">
                  Earn While You Trade
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
                Get rewarded for every trade, referral, and milestone. Our revolutionary rewards system maximizes your earning potential.
              </p>

              {/* Animated Stats Bar */}
              <div className="mt-12 flex items-center justify-center gap-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-1">
                    <AnimatedCounter value={2500000} />+
                  </div>
                  <div className="text-sm text-muted-foreground">Total Rewards Paid</div>
                </div>
                <div className="w-px h-12 bg-primary/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-1">
                    <AnimatedCounter value={47} />K+
                  </div>
                  <div className="text-sm text-muted-foreground">Active Earners</div>
                </div>
                <div className="w-px h-12 bg-primary/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-1">
                    <AnimatedCounter value={156} />%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. APY</div>
                </div>
              </div>
            </div>

            {/* Enhanced Reward Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* Trading Rewards Card */}
              <Card className="group relative overflow-hidden bg-gradient-to-br from-surface/60 to-surface/40 backdrop-blur-2xl border-primary/30 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary p-4 group-hover:scale-110 transition-transform duration-300 shadow-primary">
                    <Star className="w-full h-full text-white animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gradient group-hover:scale-105 transition-transform duration-300">Trading Rewards</h3>
                  <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">0.02%</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Instant cashback on every trade executed</p>
                  
                  <div className="mt-6 w-full bg-surface/50 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                  </div>
                </div>
              </Card>

              {/* Referral Bonus Card */}
              <Card className="group relative overflow-hidden bg-gradient-to-br from-surface/60 to-surface/40 backdrop-blur-2xl border-primary/30 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-primary p-4 group-hover:scale-110 transition-transform duration-300 shadow-secondary">
                    <Users className="w-full h-full text-white animate-pulse" style={{ animationDelay: '500ms' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gradient group-hover:scale-105 transition-transform duration-300">Referral Bonus</h3>
                  <div className="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform duration-300">25%</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Lifetime earnings from referred friends</p>
                  
                  <div className="mt-6 w-full bg-surface/50 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full w-0 group-hover:w-3/4 transition-all duration-1000 ease-out" style={{ transitionDelay: '200ms' }} />
                  </div>
                </div>
              </Card>

              {/* Volume Bonus Card */}
              <Card className="group relative overflow-hidden bg-gradient-to-br from-surface/60 to-surface/40 backdrop-blur-2xl border-primary/30 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '600ms' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary p-4 group-hover:scale-110 transition-transform duration-300 shadow-primary">
                    <TrendingUp className="w-full h-full text-white animate-pulse" style={{ animationDelay: '1000ms' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gradient group-hover:scale-105 transition-transform duration-300">Volume Bonus</h3>
                  <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">50%</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Maximum fee discount for high volume</p>
                  
                  <div className="mt-6 w-full bg-surface/50 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full w-0 group-hover:w-full transition-all duration-1000 ease-out" style={{ transitionDelay: '400ms' }} />
                  </div>
                </div>
              </Card>

              {/* Loyalty NFTs Card */}
              <Card className="group relative overflow-hidden bg-gradient-to-br from-surface/60 to-surface/40 backdrop-blur-2xl border-primary/30 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '800ms' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-primary p-4 group-hover:scale-110 transition-transform duration-300 shadow-secondary">
                    <Sparkles className="w-full h-full text-white animate-pulse" style={{ animationDelay: '1500ms' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gradient group-hover:scale-105 transition-transform duration-300">Loyalty NFTs</h3>
                  <div className="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform duration-300">RARE</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Exclusive collectibles & utility perks</p>
                  
                  <div className="mt-6 w-full bg-surface/50 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full w-0 group-hover:w-5/6 transition-all duration-1000 ease-out" style={{ transitionDelay: '600ms' }} />
                  </div>
                </div>
              </Card>
            </div>

            {/* Enhanced CTA Section */}
            <div className="text-center">
              <div className="relative inline-block animate-slide-up" style={{ animationDelay: '1000ms' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-30 animate-glow" />
                <Button className="relative bg-gradient-to-r from-primary to-secondary text-white px-12 py-6 rounded-full text-xl font-bold shadow-hero hover:shadow-primary/80 transition-all duration-300 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center">
                    <Star className="w-6 h-6 mr-4 animate-pulse" />
                    Claim Your Rewards
                    <ArrowUpRight className="w-6 h-6 ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </Button>
              </div>
              
              <p className="mt-6 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '1200ms' }}>
                Start earning immediately • No minimum requirements • Rewards paid in real-time
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-surface/10 backdrop-blur-xl">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-primary/10 border-primary/30 text-primary px-6 py-2 text-sm font-medium">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about trading on Grok Terminal.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "Is Grok Terminal safe to use?",
                  answer: "Yes, Grok Terminal employs bank-grade security measures including multi-signature wallets, end-to-end encryption, and smart contract audits by leading security firms."
                },
                {
                  question: "What trading fees do you charge?",
                  answer: "We charge competitive trading fees starting from 0.1% per trade, with volume-based discounts up to 50% for high-volume traders."
                },
                {
                  question: "Which blockchains do you support?",
                  answer: "We support 15+ major blockchains including Ethereum, Binance Smart Chain, Polygon, Solana, Avalanche, and many more."
                },
                {
                  question: "Do I need to create an account?",
                  answer: "No account creation required! Simply connect your Web3 wallet and start trading immediately. We're completely non-custodial."
                },
                {
                  question: "How do I earn rewards?",
                  answer: "You earn rewards through trading (0.02% cashback), referrals (25% of fees), volume bonuses (up to 50% discount), and loyalty NFTs."
                }
              ].map((faq, index) => (
                <Card key={index} className="bg-surface/40 backdrop-blur-xl border-primary/20 overflow-hidden group">
                  <details className="cursor-pointer">
                    <summary className="p-6 flex items-center justify-between hover:bg-primary/5 transition-colors">
                      <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 backdrop-blur-xl">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-gradient">
                Ready to Start Trading?
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Join thousands of professional traders already using Grok Terminal. 
                Connect your wallet and start trading in under 30 seconds.
              </p>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
                <Lock className="w-4 h-4" />
                <span>
                  Secure & Audited • No signup required • Non-custodial
                </span>
              </div>

              <Button
                onClick={() => navigate("/terminal")}
                className="bg-gradient-to-r from-primary to-secondary text-white px-12 py-6 rounded-full text-xl font-bold shadow-hero hover:shadow-primary/60 transition-all duration-300 group"
              >
                <Wallet className="w-6 h-6 mr-4" />
                Connect Wallet & Trade
                <ArrowUpRight className="w-6 h-6 ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-primary/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary p-2">
                <Sparkles className="w-full h-full text-white" />
              </div>
              <span className="text-lg font-display font-bold text-gradient">
                Grok Terminal
              </span>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>

            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Grok Terminal. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;