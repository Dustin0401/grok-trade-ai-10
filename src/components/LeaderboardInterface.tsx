import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Trophy, 
  TrendingUp, 
  TrendingDown,
  MoreHorizontal,
  Crown,
  Star
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LeaderboardInterface = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("1d");
  const [selectedTab, setSelectedTab] = useState("kol");

  const periods = ["1d", "3d", "7d", "14d", "30d"];
  const tabs = [
    { id: "kol", label: "KOL" },
    { id: "global", label: "Global" },
    { id: "wallets", label: "Your Wallets" },
    { id: "tracked", label: "Tracked" }
  ];

  const mockLeaderboard = [
    {
      rank: 4,
      name: "Loopier",
      avatar: "🏆",
      pnl: "+$2.67K",
      pnlValue: 2670,
      winRate: 49.55,
      positions: { total: 777, won: 386, lost: 392 },
      trades: { total: 2340, won: 1240, lost: 1358 },
      volume: "$15.3K",
      avgHold: "2h",
      verified: true
    },
    {
      rank: 5,
      name: "*1simple",
      avatar: "🎯",
      pnl: "+$2.49K",
      pnlValue: 2490,
      winRate: 64.73,
      positions: { total: 615, won: 398, lost: 217 },
      trades: { total: 2170, won: 1404, lost: 766 },
      volume: "$31.5K",
      avgHold: "4m",
      verified: false
    },
    {
      rank: 6,
      name: "Awkchain45",
      avatar: "⚡",
      pnl: "+$2.37K",
      pnlValue: 2370,
      winRate: 66.04,
      positions: { total: 2930, won: 1936, lost: 995 },
      trades: { total: 7370, won: 4870, lost: 2500 },
      volume: "$16.6K",
      avgHold: "3m",
      verified: true
    },
    {
      rank: 7,
      name: "Brox",
      avatar: "🌟",
      pnl: "+$2.2K",
      pnlValue: 2200,
      winRate: 46.25,
      positions: { total: 307, won: 142, lost: 165 },
      trades: { total: 1200, won: 555, lost: 645 },
      volume: "$8.96K",
      avgHold: "12h",
      verified: false
    },
    {
      rank: 8,
      name: "clikz",
      avatar: "🎮",
      pnl: "+$1.99K",
      pnlValue: 1990,
      winRate: 53.85,
      positions: { total: 1350, won: 727, lost: 623 },
      trades: { total: 4700, won: 2532, lost: 2168 },
      volume: "$19.4K",
      avgHold: "1h",
      verified: true
    },
    {
      rank: 9,
      name: "Sokrow",
      avatar: "🔥",
      pnl: "+$1.96K",
      pnlValue: 1960,
      winRate: 29.87,
      positions: { total: 462, won: 138, lost: 324 },
      trades: { total: 1420, won: 424, lost: 996 },
      volume: "$9.69K",
      avgHold: "7h",
      verified: false
    },
    {
      rank: 10,
      name: "Kev",
      avatar: "👑",
      pnl: "+$1.55K",
      pnlValue: 1550,
      winRate: 39.81,
      positions: { total: 8750, won: 3484, lost: 5267 },
      trades: { total: 24900, won: 9920, lost: 14980 },
      volume: "$63.7K",
      avgHold: "4m",
      verified: true
    },
    {
      rank: 11,
      name: "Yermi",
      avatar: "🚀",
      pnl: "+$1.22K",
      pnlValue: 1220,
      winRate: 60.65,
      positions: { total: 190, won: 115, lost: 75 },
      trades: { total: 10500, won: 6363, lost: 4137 },
      volume: "$30K",
      avgHold: "22m",
      verified: false
    }
  ];

  // Top performers for featured section
  const topPerformers = mockLeaderboard.slice(0, 3);

  const getFilteredData = () => {
    if (!searchTerm) return mockLeaderboard;
    return mockLeaderboard.filter(trader => 
      trader.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const formatPnL = (pnl: string, value: number) => {
    const isPositive = value > 0;
    return (
      <span className={`font-bold ${isPositive ? "text-bull" : "text-bear"}`}>
        {pnl}
      </span>
    );
  };

  const formatWinRate = (rate: number) => {
    const color = rate > 50 ? "text-bull" : "text-bear";
    return <span className={color}>{rate}%</span>;
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border/30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Leaderboard
          </h1>
          <Button size="sm" className="bg-primary/20 text-primary border border-primary/30">
            Apply
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search KOLs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-card/50 border-border/30"
          />
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1">
          {periods.map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={`${
                selectedPeriod === period 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-6 py-2 border-b border-border/30">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={selectedTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedTab(tab.id)}
            className={`${
              selectedTab === tab.id 
                ? "bg-card text-foreground border-b-2 border-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Top Performers Cards */}
      <div className="p-6 border-b border-border/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.map((trader, index) => (
            <Card key={trader.rank} className={`p-4 relative overflow-hidden ${
              index === 0 ? "border-primary/50 bg-primary/5" : "bg-card/50"
            }`}>
              {index === 0 && (
                <Crown className="absolute top-2 right-2 w-5 h-5 text-primary" />
              )}
              
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-lg">{trader.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{trader.name}</h3>
                    {trader.verified && <Star className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">#{trader.rank}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">PnL</span>
                  {formatPnL(trader.pnl, trader.pnlValue)}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  {formatWinRate(trader.winRate)}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <span className="text-sm font-medium">{trader.volume}</span>
                </div>
              </div>

              {/* Mini stats */}
              <div className="mt-3 pt-3 border-t border-border/30">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Positions</span>
                    <div className="flex items-center gap-1">
                      <span className="text-bull">{trader.positions.won}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-bear">{trader.positions.lost}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Avg Hold</span>
                    <span className="font-medium">{trader.avgHold}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30">
              <TableHead className="text-muted-foreground">Rank</TableHead>
              <TableHead className="text-muted-foreground">Trader</TableHead>
              <TableHead className="text-muted-foreground text-right">PnL</TableHead>
              <TableHead className="text-muted-foreground text-right">Win Rate</TableHead>
              <TableHead className="text-muted-foreground text-right">Positions</TableHead>
              <TableHead className="text-muted-foreground text-right">Trades</TableHead>
              <TableHead className="text-muted-foreground text-right">Volume</TableHead>
              <TableHead className="text-muted-foreground text-right">Avg Hold</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getFilteredData().map((trader) => (
              <TableRow key={trader.rank} className="border-border/30 hover:bg-card/30">
                <TableCell className="font-medium">
                  <Badge variant="outline" className="text-xs">
                    {trader.rank}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-sm">{trader.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{trader.name}</span>
                      {trader.verified && <Star className="w-3 h-3 text-primary" />}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  {formatPnL(trader.pnl, trader.pnlValue)}
                </TableCell>
                
                <TableCell className="text-right">
                  {formatWinRate(trader.winRate)}
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 text-sm">
                    <span className="text-bull">{trader.positions.won}</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-bear">{trader.positions.lost}</span>
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 text-sm">
                    <span className="text-bull">{trader.trades.won}</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-bear">{trader.trades.lost}</span>
                  </div>
                </TableCell>
                
                <TableCell className="text-right text-sm">
                  {trader.volume}
                </TableCell>
                
                <TableCell className="text-right text-sm">
                  {trader.avgHold}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderboardInterface;