import CalorieSummary from "../../features/summary/CalorieSummary";
import ServingSummary from "../../features/summary/ServingSummary";

export const TotalSummary = () => (
  <div className="d-flex">
    <CalorieSummary />
    <div className="flex-fill">
      <ServingSummary />
    </div>
  </div>
)