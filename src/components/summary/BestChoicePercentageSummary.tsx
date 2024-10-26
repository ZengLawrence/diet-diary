import BestChoicePercentage from "../../features/summary/BestChoicePercentage";
import BestChoiceServingPercentage from "../../features/summary/BestChoiceServingPercentage";

export const BestChoicePercentageSummary = () => (
  <div className="d-flex">
    <BestChoicePercentage />
    <div className="flex-fill">
      <BestChoiceServingPercentage />
    </div>
  </div>
)