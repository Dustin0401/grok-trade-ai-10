import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Gift,
  Star,
  Trophy,
  Medal,
  Crown,
  Zap,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Coins,
  Target,
  Calendar
} from "lucide-react";

const RewardsCenter = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const rewardStats = {
    totalEarned: "2,847.52",
    pendingRewards: "156.23",
    completedTasks: 18,
    currentLevel: "Gold",
    nextLevel: "Platinum",
    levelProgress: 72
  };

  const dailyTasks = [
    {
      id: "daily_trade",
      title: "Complete 3 Trades",
      description: "Execute 3 successful trades today",
      reward: "10 USDT",
      progress: 2,
      total: 3,
      completed: false,
      icon: TrendingUp,
      timeLeft: "18h 32m"
    },
    {
      id: "daily_stake",
      title: "Stake Assets",
      description: "Stake at least $100 worth of assets",
      reward: "5 USDT",
      progress: 0,
      total: 1,
      completed: false,
      icon: Target,
      timeLeft: "18h 32m"
    },
    {
      id: "daily_referral",
      title: "Invite a Friend",
      description: "Share your referral link",
      reward: "15 USDT",
      progress: 1,
      total: 1,
      completed: true,
      icon: Users,
      timeLeft: "Completed"
    }
  ];

  const weeklyTasks = [
    {
      id: "weekly_volume",
      title: "$10K Trading Volume",
      description: "Reach $10,000 in trading volume this week",
      reward: "50 USDT",
      progress: 6750,
      total: 10000,
      completed: false,
      icon: Trophy,
      timeLeft: "4d 12h"
    },
    {
      id: "weekly_streak",
      title: "7-Day Login Streak",
      description: "Login for 7 consecutive days",
      reward: "25 USDT",
      progress: 5,
      total: 7,
      completed: false,
      icon: Calendar,
      timeLeft: "4d 12h"
    }
  ];

  const achievements = [
    {
      id: "first_trade",
      title: "First Trade",
      description: "Complete your first trade",
      reward: "20 USDT",
      completed: true,
      icon: Star,
      rarity: "Common"
    },
    {
      id: "big_trader",
      title: "Big Trader",
      description: "Execute a trade worth $1,000+",
      reward: "100 USDT",
      completed: true,
      icon: Crown,
      rarity: "Rare"
    },
    {
      id: "diamond_hands",
      title: "Diamond Hands",
      description: "Hold a position for 30+ days",
      reward: "200 USDT",
      completed: false,
      icon: Medal,
      rarity: "Epic"
    },
    {
      id: "whale_status",
      title: "Whale Status",
      description: "Reach $100K portfolio value",
      reward: "500 USDT",
      completed: false,
      icon: Trophy,
      rarity: "Legendary"
    }
  ];

  const referralProgram = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarned: "456.78",
    commissionRate: "25%",
    referralCode: "TRADE2024XYZ"
  };

  const levelRewards = [
    { level: "Bronze", requirement: "Complete 5 trades", reward: "50 USDT", completed: true },
    { level: "Silver", requirement: "Stake $1,000", reward: "100 USDT", completed: true },
    { level: "Gold", requirement: "10 referrals", reward: "250 USDT", completed: true },
    { level: "Platinum", requirement: "$50K trading volume", reward: "500 USDT", completed: false },
    { level: "Diamond", requirement: "$100K portfolio", reward: "1,000 USDT", completed: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold text-yellow-500">${rewardStats.totalEarned}</p>
              </div>
              <Coins className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-green-500">${rewardStats.pendingRewards}</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasks Done</p>
                <p className="text-2xl font-bold text-blue-500">{rewardStats.completedTasks}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-2xl font-bold text-purple-500">{rewardStats.currentLevel}</p>
              </div>
              <Crown className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">Daily Tasks</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="referral">Referral</TabsTrigger>
          <TabsTrigger value="levels">Levels</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Tasks */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Daily Tasks</h3>
              {dailyTasks.map((task) => {
                const Icon = task.icon;
                return (
                  <Card key={task.id} className={task.completed ? "bg-green-500/5 border-green-500/20" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${task.completed ? "bg-green-500/20" : "bg-primary/10"}`}>
                            <Icon className={`w-5 h-5 ${task.completed ? "text-green-500" : "text-primary"}`} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-semibold">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-green-500">
                                {task.reward}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {task.timeLeft}
                              </span>
                            </div>
                          </div>
                        </div>
                        {task.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Button size="sm">
                            Claim
                          </Button>
                        )}
                      </div>
                      {!task.completed && (
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{task.progress}/{task.total}</span>
                          </div>
                          <Progress value={(task.progress / task.total) * 100} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Weekly Tasks */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Weekly Challenges</h3>
              {weeklyTasks.map((task) => {
                const Icon = task.icon;
                return (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-purple-500/10">
                            <Icon className="w-5 h-5 text-purple-500" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-semibold">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-purple-500">
                                {task.reward}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {task.timeLeft}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            {typeof task.progress === 'number' && task.progress > 1000 
                              ? `$${(task.progress / 1000).toFixed(1)}K/$${(task.total / 1000).toFixed(0)}K`
                              : `${task.progress}/${task.total}`
                            }
                          </span>
                        </div>
                        <Progress value={(task.progress / task.total) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                const rarityColors = {
                  Common: "text-gray-500 border-gray-500/20",
                  Rare: "text-blue-500 border-blue-500/20",
                  Epic: "text-purple-500 border-purple-500/20",
                  Legendary: "text-yellow-500 border-yellow-500/20"
                };
                
                return (
                  <Card 
                    key={achievement.id} 
                    className={`${achievement.completed ? "bg-gradient-to-br from-primary/5 to-primary/10" : "opacity-60"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${achievement.completed ? "bg-primary/20" : "bg-muted"}`}>
                            <Icon className={`w-6 h-6 ${achievement.completed ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{achievement.title}</h4>
                              <Badge variant="outline" className={rarityColors[achievement.rarity as keyof typeof rarityColors]}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <Badge variant="secondary" className="text-green-500">
                              {achievement.reward}
                            </Badge>
                          </div>
                        </div>
                        {achievement.completed && (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="referral" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Referral Program</CardTitle>
                <CardDescription>
                  Earn 25% commission on every trade your referrals make
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{referralProgram.totalReferrals}</p>
                    <p className="text-sm text-muted-foreground">Total Referrals</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-green-500">${referralProgram.totalEarned}</p>
                    <p className="text-sm text-muted-foreground">Total Earned</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Referral Code</label>
                  <div className="flex gap-2">
                    <div className="flex-1 p-2 bg-muted rounded border text-center font-mono">
                      {referralProgram.referralCode}
                    </div>
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>

                <Button className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Share Referral Link
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Referral Rewards</CardTitle>
                <CardDescription>
                  Track your referral performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Commission Rate:</span>
                    <span className="font-semibold text-primary">{referralProgram.commissionRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Referrals:</span>
                    <span className="font-semibold">{referralProgram.activeReferrals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Month:</span>
                    <span className="font-semibold text-green-500">$89.23</span>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                  <h4 className="font-semibold mb-2">Bonus Rewards</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>5 referrals:</span>
                      <span className="text-primary">+$50 bonus</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10 referrals:</span>
                      <span className="text-primary">+$150 bonus</span>
                    </div>
                    <div className="flex justify-between">
                      <span>25 referrals:</span>
                      <span className="text-primary">+$500 bonus</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="levels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Level Progress</CardTitle>
              <CardDescription>
                Complete challenges to level up and unlock bigger rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Current Level: {rewardStats.currentLevel}</span>
                  <span className="text-sm text-muted-foreground">
                    Next: {rewardStats.nextLevel}
                  </span>
                </div>
                <Progress value={rewardStats.levelProgress} className="h-3" />
                <p className="text-sm text-center text-muted-foreground">
                  {rewardStats.levelProgress}% to {rewardStats.nextLevel}
                </p>
              </div>

              <div className="space-y-3">
                {levelRewards.map((level, index) => (
                  <div 
                    key={level.level} 
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      level.completed 
                        ? "bg-green-500/5 border-green-500/20" 
                        : level.level === rewardStats.currentLevel
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        level.completed 
                          ? "bg-green-500 text-white" 
                          : level.level === rewardStats.currentLevel
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {level.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{level.level}</p>
                        <p className="text-sm text-muted-foreground">{level.requirement}</p>
                      </div>
                    </div>
                    <Badge variant={level.completed ? "default" : "secondary"} className="text-green-500">
                      {level.reward}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsCenter;