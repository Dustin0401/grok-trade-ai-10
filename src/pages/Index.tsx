import { useState } from "react";
import TradingHeader from "@/components/TradingHeader";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import TradingChart from "@/components/TradingChart";
import TradingInterface from "@/components/TradingInterface";
import TrendingPairs from "@/components/TrendingPairs";
import { TrendingUp, BarChart3, DollarSign, Wallet } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("trending");

  const tabs = [
    { id: "trending", icon: TrendingUp, label: "Trending" },
    { id: "charts", icon: BarChart3, label: "Charts" },
    { id: "trade", icon: DollarSign, label: "Trade" },
    { id: "portfolio", icon: Wallet, label: "Portfolio" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "trending":
        return <TrendingPairs />;
      case "charts":
        return <TradingChart />;
      case "trade":
        return <TradingInterface />;
      case "portfolio":
        return <PortfolioDashboard />;
      default:
        return <TrendingPairs />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <TradingHeader />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <div className="w-16 bg-card/50 border-r border-border/30 flex flex-col py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-12 h-12 mx-2 mb-2 rounded-lg flex items-center justify-center transition-all group relative ${
                  activeTab === tab.id
                    ? "bg-grok/20 text-grok border border-grok/30"
                    : "hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border/50 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {tab.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;