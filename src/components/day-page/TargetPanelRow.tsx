import NewDayButton from "../../features/day-page/NewDayButton";
import TargetPanel from "../../features/target/TargetPanel";
import { VariantDanger } from "../ButtonVariant";

export const TargetPanelRow = (props: { showNewDayButton: boolean }) => (
  <div className="d-flex flex-row">
    <div className="d-flex align-items-center">
      {props.showNewDayButton && <NewDayButton variant={VariantDanger}>New Day</NewDayButton>}
    </div>
    <TargetPanel />
  </div>
);
