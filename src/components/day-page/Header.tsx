import DatePanel from "../../features/day-page/DatePanel";
import HeaderButtons from "../../features/day-page/HeaderButtons";
import { TargetPanelRow } from "./TargetPanelRow";

export const Header = () => (
  <div className="d-flex flex-column justify-content-between align-items-center">
    <DatePanel />
    <TargetPanelRow />
    <HeaderButtons />
  </div>
)
