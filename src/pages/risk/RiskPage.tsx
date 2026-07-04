import { AiRiskAnalysis } from "@/components/risk/ai-risk-analysis";
import { RecommendedActions } from "@/components/risk/recommended-actions";
import { RiskFactorBreakdown } from "@/components/risk/risk-factor-breakdown";
import { RiskGauge } from "@/components/risk/risk-gauge";
import { RiskHistoryChart } from "@/components/risk/risk-history-chart";

function RiskPage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <RiskGauge />
        <RiskFactorBreakdown />
      </div>
      <AiRiskAnalysis />
      <div className="grid grid-cols-2 gap-4">
        <RecommendedActions />
        <RiskHistoryChart />
      </div>
    </div>
  );
}

export default RiskPage;
