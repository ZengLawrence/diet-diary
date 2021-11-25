import HeaderButtons from "../../features/day-page/HeaderButtons";
import TargetPanel from "../../features/target/TargetPanel";

export const Header = (props: { date: string }) => (
  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
    <h1 className="order-md-1" data-cy="date">{props.date}</h1>
    <div className="order-md-0">
      <TargetPanel />
    </div>
    <div className="order-md-2">
      <HeaderButtons />
    </div>
  </div>
)
