import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Zap, 
  TrendingUp, 
  Eye, 
  MessageCircle, 
  Heart,
  ExternalLink,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PulseInterface = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("new");

  const mockTokens = {
    new: [
      {
        id: 1,
        name: "gabble go",
        symbol: "Captain Gabble",
        avatar: "🐸",
        marketCap: "$5.55K",
        price: "$722",
        change24h: 0,
        volume: "$0.92",
        txCount: 5,
        holders: 1,
        comments: 0,
        likes: 0,
        phase: "pump",
        progress: 0
      },
      {
        id: 2,
        name: "JOY",
        symbol: "Joyful Cats",
        avatar: "😸",
        marketCap: "$6.32K",
        price: "$34K",
        change24h: 8,
        volume: "$0.029",
        txCount: 4,
        holders: 1,
        comments: 0,
        likes: 0,
        phase: "pump",
        progress: 8
      },
      {
        id: 3,
        name: "Solson",
        symbol: "Sol Season",
        avatar: "☀️",
        marketCap: "$6.22K",
        price: "$4K",
        change24h: 6,
        volume: "$0.076",
        txCount: 7,
        holders: 3,
        comments: 0,
        likes: 0,
        phase: "pump",
        progress: 6
      }
    ],
    final: [
      {
        id: 4,
        name: "TST666",
        symbol: "test666",
        avatar: "T",
        marketCap: "$197B",
        price: "$206",
        change24h: 59,
        volume: "$0.024",
        txCount: 2,
        holders: 1,
        comments: 0,
        likes: 2,
        phase: "final",
        progress: 59
      },
      {
        id: 5,
        name: "$feepool",
        symbol: "feepool",
        avatar: "🐸",
        marketCap: "$1.89B",
        price: "$5",
        change24h: 70,
        volume: "$0.002",
        txCount: 5,
        holders: 4,
        comments: 0,
        likes: 0,
        phase: "final",
        progress: 70
      },
      {
        id: 6,
        name: "$Cloudy",
        symbol: "Cloudy",
        avatar: "?",
        marketCap: "$711M",
        price: "$2",
        change24h: 70,
        volume: "$0.009",
        txCount: 1,
        holders: 1,
        comments: 0,
        likes: 0,
        phase: "final",
        progress: 70
      }
    ],
    migrated: [
      {
        id: 7,
        name: "SMOLE",
        symbol: "The Smolest Cat",
        avatar: "😺",
        marketCap: "$18.9M",
        price: "$4K",
        change24h: 0,
        volume: "$0.013",
        txCount: 1,
        holders: 1,
        comments: 1,
        likes: 0,
        phase: "migrated",
        progress: 100
      },
      {
        id: 8,
        name: "SOL",
        symbol: "SpongeBobTrump420ShadowPuBaJuBo",
        avatar: "🧽",
        marketCap: "",
        price: "",
        change24h: 21,
        volume: "$30.7",
        txCount: 665,
        holders: 351,
        comments: 6,
        likes: 1,
        phase: "migrated",
        progress: 100
      },
      {
        id: 9,
        name: "KEV",
        symbol: "MLG KEV",
        avatar: "🎮",
        marketCap: "$30.5K",
        price: "$51K",
        change24h: 0,
        volume: "",
        txCount: 133,
        holders: 49,
        comments: 1,
        likes: 0,
        phase: "migrated",
        progress: 100
      }
    ]
  };

  const sections = [
    { id: "new", label: "New Pairs", count: mockTokens.new.length, icon: Zap },
    { id: "final", label: "Final Stretch", count: mockTokens.final.length, icon: TrendingUp },
    { id: "migrated", label: "Migrated", count: mockTokens.migrated.length, icon: ExternalLink }
  ];

  const getTokens = () => {
    const tokens = mockTokens[selectedSection as keyof typeof mockTokens];
    if (!searchTerm) return tokens;
    return tokens.filter(token => 
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const formatPrice = (price: string) => {
    if (!price) return "";
    return price;
  };

  const formatMarketCap = (mc: string) => {
    if (!mc) return "";
    return mc;
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border/30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Pulse</h1>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="text-primary border-primary/50">
              <Filter className="w-4 h-4 mr-1" />
              Display
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search token..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-card/50 border-border/30"
          />
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-1 p-4 border-b border-border/30">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Button
              key={section.id}
              variant={selectedSection === section.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedSection(section.id)}
              className={`flex items-center gap-2 ${
                selectedSection === section.id 
                  ? "bg-primary/20 text-primary border border-primary/30" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{section.label}</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {section.count}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Token List */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-3">
          {getTokens().map((token) => (
            <Card key={token.id} className="p-4 bg-card/50 border-border/30 hover:bg-card/70 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-lg">{token.avatar}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{token.name}</h3>
                      <span className="text-sm text-muted-foreground">{token.symbol}</span>
                      {token.phase === "pump" && (
                        <Badge variant="outline" className="text-xs text-warning border-warning/50">
                          pump
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>MC {formatMarketCap(token.marketCap)}</span>
                      {token.price && <span>{formatPrice(token.price)}</span>}
                      {token.change24h !== 0 && (
                        <span className={token.change24h > 0 ? "text-bull" : "text-bear"}>
                          {token.change24h > 0 ? "+" : ""}{token.change24h}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{token.holders}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{token.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{token.likes}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar for Final Stretch */}
              {token.phase === "final" && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{token.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${token.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Additional Stats */}
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>Vol: {token.volume}</span>
                  <span>TX: {token.txCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div 
                      key={i}
                      className={`w-1 h-4 rounded-full ${
                        Math.random() > 0.5 ? "bg-bull" : "bg-bear"
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PulseInterface;