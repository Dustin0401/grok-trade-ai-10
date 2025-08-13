import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Lock, 
  Unlock, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Percent, 
  Star,
  Shield,
  Zap,
  Trophy
} from "lucide-react";

const StakingInterface = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedPool, setSelectedPool] = useState("flexible");

  const stakingPools = [
    {
      id: "flexible",
      name: "Flexible Staking",
      apy: "8.5%",
      minStake: "100",
      lockPeriod: "None",
      description: "Unstake anytime with no penalties",
      icon: Unlock,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      id: "30days",
      name: "30-Day Lock",
      apy: "12.8%",
      minStake: "500",
      lockPeriod: "30 Days",
      description: "Higher rewards for commitment",
      icon: Lock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: "90days",
      name: "90-Day Lock",
      apy: "18.2%",
      minStake: "1000",
      lockPeriod: "90 Days",
      description: "Premium rewards for long-term staking",
      icon: Shield,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      id: "365days",
      name: "1-Year Lock",
      apy: "25.5%",
      minStake: "5000",
      lockPeriod: "365 Days",
      description: "Maximum rewards for diamond hands",
      icon: Trophy,
      color: "text-gold-500",
      bgColor: "bg-yellow-500/10"
    }
  ];

  const activeStakes = [
    {
      pool: "Flexible Staking",
      amount: "2,500 USDT",
      apy: "8.5%",
      earned: "45.32 USDT",
      status: "Active",
      daysLeft: "Flexible"
    },
    {
      pool: "30-Day Lock",
      amount: "5,000 USDT",
      apy: "12.8%",
      earned: "128.47 USDT",
      status: "Locked",
      daysLeft: "18 days"
    }
  ];

  const stakingStats = {
    totalStaked: "7,500",
    totalEarned: "173.79",
    activeStakes: 2,
    avgApy: "11.2%"
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Staked</p>
                <p className="text-2xl font-bold text-primary">${stakingStats.totalStaked}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold text-green-500">${stakingStats.totalEarned}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Stakes</p>
                <p className="text-2xl font-bold text-blue-500">{stakingStats.activeStakes}</p>
              </div>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg APY</p>
                <p className="text-2xl font-bold text-purple-500">{stakingStats.avgApy}</p>
              </div>
              <Percent className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stake" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stake">Stake Assets</TabsTrigger>
          <TabsTrigger value="manage">Manage Stakes</TabsTrigger>
        </TabsList>

        <TabsContent value="stake" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Staking Pools */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold">Choose Staking Pool</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stakingPools.map((pool) => {
                  const Icon = pool.icon;
                  return (
                    <Card
                      key={pool.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedPool === pool.id
                          ? "ring-2 ring-primary border-primary"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPool(pool.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-lg ${pool.bgColor}`}>
                            <Icon className={`w-5 h-5 ${pool.color}`} />
                          </div>
                          <Badge variant="secondary" className={pool.color}>
                            {pool.apy} APY
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{pool.name}</CardTitle>
                        <CardDescription>{pool.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Min Stake:</span>
                            <span className="font-medium">${pool.minStake}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lock Period:</span>
                            <span className="font-medium">{pool.lockPeriod}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Stake Form */}
            <Card>
              <CardHeader>
                <CardTitle>Stake Amount</CardTitle>
                <CardDescription>
                  Enter the amount you want to stake
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (USDT)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="text-lg"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Balance: 10,000 USDT</span>
                    <button className="text-primary hover:underline">
                      Max
                    </button>
                  </div>
                </div>

                {stakeAmount && (
                  <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>You'll stake:</span>
                      <span className="font-medium">{stakeAmount} USDT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Expected daily rewards:</span>
                      <span className="font-medium text-green-500">
                        {(parseFloat(stakeAmount || "0") * 0.085 / 365).toFixed(4)} USDT
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>APY:</span>
                      <span className="font-medium">
                        {stakingPools.find(p => p.id === selectedPool)?.apy}
                      </span>
                    </div>
                  </div>
                )}

                <Button className="w-full" size="lg">
                  <Lock className="w-4 h-4 mr-2" />
                  Stake Now
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By staking, you agree to the terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Active Stakes</h3>
            <div className="space-y-4">
              {activeStakes.map((stake, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{stake.pool}</h4>
                          <Badge variant={stake.status === "Active" ? "default" : "secondary"}>
                            {stake.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Staked: {stake.amount} • APY: {stake.apy}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-500">{stake.earned}</p>
                        <p className="text-sm text-muted-foreground">Earned</p>
                      </div>
                    </div>
                    
                    {stake.daysLeft !== "Flexible" && (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Time remaining:</span>
                          <span>{stake.daysLeft}</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Clock className="w-4 h-4 mr-2" />
                        Claim Rewards
                      </Button>
                      {stake.status === "Active" && (
                        <Button variant="outline" size="sm">
                          <Unlock className="w-4 h-4 mr-2" />
                          Unstake
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StakingInterface;