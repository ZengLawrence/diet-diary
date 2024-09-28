import DatePanel from "../../features/day-page/DatePanel";
import HeaderButtons from "../../features/day-page/HeaderButtons";
import TargetPanel from "../../features/target/TargetPanel";

export const Header = (props: { date: string }) => (
  <div className="d-flex flex-column justify-content-between align-items-center">
    <DatePanel />
    <TargetPanel />
    <HeaderButtons />
  </div>
)
