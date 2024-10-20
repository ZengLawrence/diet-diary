import CalorieSummary from "../../features/summary/CalorieSummary";
import ServingSummary from "../../features/summary/ServingSummary";
import WarningBorder from "../../features/warning/WarningBorder";

export const TotalSummary = () => (
  <div className="d-flex">
    <WarningBorder flex>
      <CalorieSummary />
    </WarningBorder>
    <div className="flex-fill">
      <ServingSummary />
    </div>
  </div>
)