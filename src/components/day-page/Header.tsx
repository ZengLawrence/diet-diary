import HeaderButtons from "../../features/day-page/HeaderButtons";
import TargetPanel from "../../features/target/TargetPanel";

export const Header = (props: { date: string }) => (
  <div className="d-flex flex-column justify-content-between align-items-center">
    <h1 data-cy="date">{props.date}</h1>
    <TargetPanel />
    <HeaderButtons />
  </div>
)
