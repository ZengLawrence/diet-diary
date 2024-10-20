import CalorieSummary from "../../features/summary/CalorieSummary";
import ServingSummary from "../../features/summary/ServingSummary";
import { WarningBorder } from "../WarningBorder";

export const TotalSummary = () => (
  <div className="d-flex">
    <WarningBorder flexFill>
      <CalorieSummary />
    </WarningBorder>
    <div className="flex-fill">
      <ServingSummary />
    </div>
  </div>
)