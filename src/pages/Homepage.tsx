import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeatureRow = ({
  number,
  title,
  description,
  variant = "left",
}: {
  number: string;
  title: string;
  description: string;
  variant?: "left" | "right";
}) => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div
        className={`grid items-center gap-10 md:gap-16 ${
          variant === "left" ? "md:grid-cols-[1fr_1.2fr]" : "md:grid-cols-[1.2fr_1fr]"
        }`}
      >
        {variant === "left" ? (
          <div className="order-1">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              <span className="tracking-widest font-semibold">{number}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold leading-tight mb-4 text-foreground">
              {title}
            </h3>
            <p className="text-muted-foreground text-lg max-w-prose">{description}</p>
          </div>
        ) : null}

        {/* Mockup card (visual only for landing) */}
        <Card className="order-2 glass-card rounded-2xl md:rounded-3xl p-0 overflow-hidden border border-border/60 bg-card/60">
          <div className="relative h-72 md:h-96 w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-bull/70" />
                <div className="h-3 w-3 rounded-full bg-bear/70" />
                <div className="h-3 w-3 rounded-full bg-primary/70" />
              </div>
              <div className="mt-4 grid grid-cols-12 gap-2">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-40 rounded-md ${i % 3 === 0 ? "bg-primary/25" : i % 3 === 1 ? "bg-bull/25" : "bg-bear/25"} terminal-glow`}
                    style={{ height: `${80 + Math.round(Math.random() * 60)}px` }}
                  />
                ))}
              </div>
              <div className="mt-auto grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-9 rounded-lg bg-muted/60 border border-border/50" />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {variant === "right" ? (
          <div className="order-3 md:order-none">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              <span className="tracking-widest font-semibold">{number}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold leading-tight mb-4 text-foreground">
              {title}
            </h3>
            <p className="text-muted-foreground text-lg max-w-prose">{description}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

const Homepage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const marketData = [
    { rank: 1, name: "Ethereum", symbol: "ETH", price: "$3,265.74", change: "+1.07%", volume: "$62.0M", up: true },
    { rank: 2, name: "Tether", symbol: "USDT", price: "$1.00", change: "+0.00%", volume: "$461M", up: true },
    { rank: 3, name: "USD Coin", symbol: "USDC", price: "$1.00", change: "+0.01%", volume: "$179M", up: true },
    { rank: 4, name: "BNB", symbol: "BNB", price: "$372.38", change: "-0.30%", volume: "$248.0M", up: false },
    { rank: 5, name: "MERL", symbol: "MERL", price: "$0.022", change: "+0.32%", volume: "$25.1M", up: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Helmet>
        <title>Explore the Market — Crypto Trading Terminal</title>
        <meta
          name="description"
          content="Explore the market: trending tokens, hidden gems, and what's moving the chain now. Professional crypto trading terminal."
        />
        <link rel="canonical" href="/" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Trading Terminal",
            "url": "/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}</script>
      </Helmet>

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-accent/10 to-transparent" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full border border-primary/10 opacity-40" />
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-primary/10 opacity-30" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full border border-primary/10 opacity-20" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/60 border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 grid place-items-center terminal-glow">
                <span className="text-xl leading-none">🤖</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a className="text-muted-foreground hover:text-foreground transition-colors" href="#">Explore</a>
              <a className="text-muted-foreground hover:text-foreground transition-colors" href="#">Radar</a>
              <a className="text-muted-foreground hover:text-foreground transition-colors" href="#">Portfolio</a>
              <a className="text-muted-foreground hover:text-foreground transition-colors" href="#">Tracker</a>
            </nav>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center w-[380px]">
            <div className="relative w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Tokens"
                className="w-full h-10 rounded-full bg-muted/60 border border-border/60 pl-4 pr-10 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/terminal")}
              className="rounded-full px-4 h-10 bg-primary text-primary-foreground hover:opacity-90 shadow-md terminal-glow"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative container mx-auto px-4 pt-14 pb-10 md:pt-24 md:pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">Explore the Market</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10">
            Dive into trending tokens, hidden gems, and what's moving the chain right now.
          </p>
          <Button
            onClick={() => navigate("/terminal")}
            className="rounded-lg px-6 md:px-8 h-11 bg-primary text-primary-foreground shadow-lg hover:opacity-95"
          >
            Connect Wallet
          </Button>

          {/* floating dots */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <span className="absolute left-[20%] top-6 w-2 h-2 rounded-full bg-accent" />
            <span className="absolute right-[22%] top-[18%] w-2 h-2 rounded-full bg-primary" />
          </div>
        </section>

        {/* Market table */}
        <section className="container mx-auto px-4 -mt-2 md:-mt-4 pb-20">
          <div className="glass-card rounded-2xl overflow-hidden border border-border/60 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border/50">
                    <th className="px-6 py-4 text-left text-muted-foreground">#</th>
                    <th className="px-6 py-4 text-left text-muted-foreground">Token name</th>
                    <th className="px-6 py-4 text-left text-muted-foreground">Price</th>
                    <th className="px-6 py-4 text-left text-muted-foreground">24H</th>
                    <th className="px-6 py-4 text-left text-muted-foreground">Volume</th>
                    <th className="px-6 py-4 text-left text-muted-foreground">1D Chart</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((row) => (
                    <tr key={row.rank} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-5 text-muted-foreground">{row.rank}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/30 border border-primary/40 grid place-items-center terminal-glow">
                            <span className="text-xs font-semibold">{row.symbol[0]}</span>
                          </div>
                          <div>
                            <div className="font-medium">{row.name} {row.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-medium">{row.price}</td>
                      <td className={`px-6 py-5 font-semibold ${row.up ? "text-bull" : "text-bear"}`}>{row.change}</td>
                      <td className="px-6 py-5 text-muted-foreground">{row.volume}</td>
                      <td className="px-6 py-5">
                        <div className={`h-6 w-16 rounded-md border ${row.up ? "border-bull/40 bg-bull/20" : "border-bear/40 bg-bear/20"}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Features heading */}
        <section className="container mx-auto px-4 py-10 md:py-24 text-center">
          <div className="text-sm text-accent-foreground/80 tracking-widest mb-4">FEATURES</div>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Built by Traders
            <br className="hidden md:block" /> for Traders
          </h2>
        </section>

        {/* Feature rows */}
        <FeatureRow
          number="01"
          title="Discover"
          description="Discover new tokens and filter by your preferences."
          variant="left"
        />
        <FeatureRow
          number="02"
          title="Monitor"
          description="Real-time security updates & easily monitor your portfolio."
          variant="right"
        />
        <FeatureRow
          number="03"
          title="Buy and Sell"
          description="Trade faster with a speed advantage on every transaction."
          variant="left"
        />

        {/* Footer CTA */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Start Trading In Less
            <br className="hidden md:block" /> Than 30 Secs
          </h2>
          <p className="text-muted-foreground mb-6">Install Phantom and connect your wallet to log in.</p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <div className="relative inline-flex items-center">
              <input id="agree" type="checkbox" className="peer sr-only" />
              <span className="mr-2 h-5 w-5 rounded-md border border-border grid place-items-center peer-checked:bg-primary peer-checked:border-primary transition-colors">
                <Check className="h-3.5 w-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity" />
              </span>
            </div>
            <label htmlFor="agree">
              By connecting, I agree to the <a className="underline hover:opacity-90" href="#">Terms</a>&
              <a className="underline hover:opacity-90" href="#">Privacy</a>
            </label>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button onClick={() => navigate("/terminal")} className="h-11 px-6 rounded-lg bg-primary text-primary-foreground">
              Connect Wallet <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="pb-10">
        <div className="container mx-auto px-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Trading Terminal</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Terms of Use</a>
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
