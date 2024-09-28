import HeaderButtons from "../../features/day-page/HeaderButtons";
import TargetPanel from "../../features/target/TargetPanel";
import { DatePanel } from "./DatePanel";

export const Header = (props: { date: string }) => (
  <div className="d-flex flex-column justify-content-between align-items-center">
    <DatePanel date={props.date} />
    <TargetPanel />
    <HeaderButtons />
  </div>
)
