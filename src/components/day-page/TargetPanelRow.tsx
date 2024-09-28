import NewDayButton from "../../features/day-page/NewDayButton";
import TargetPanel from "../../features/target/TargetPanel";
import { VariantDanger } from "../ButtonVariant";

export const TargetPanelRow = () => (
  <div className="d-flex flex-row">
    <div className="d-flex align-items-center">
      <NewDayButton variant={VariantDanger}>New Day</NewDayButton>
    </div>
    <TargetPanel />
  </div>
);
