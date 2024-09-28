import DatePanel from "../../features/day-page/DatePanel";
import HeaderButtons from "../../features/day-page/HeaderButtons";
import NewDayButton from "../../features/day-page/NewDayButton";
import TargetPanel from "../../features/target/TargetPanel";
import { VariantDanger } from "../ButtonVariant";

const TargetPanelRow = () => (
  <div className="d-flex flex-row">
    <div className="d-flex align-items-center">
      <NewDayButton variant={VariantDanger}>New Day</NewDayButton>
    </div>
    <TargetPanel />
  </div>
);

export const Header = () => (
  <div className="d-flex flex-column justify-content-between align-items-center">
    <DatePanel />
    <TargetPanelRow />
    <HeaderButtons />
  </div>
)
