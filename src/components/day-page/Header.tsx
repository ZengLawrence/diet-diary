import HeaderButtons from "../../features/day-page/HeaderButtons";
import TargetPanel from "../../features/target/TargetPanel";

const DatePanel = (props: { date: string }) => (
  <h1 data-cy="date">{props.date}</h1>  
);

export const Header = (props: { date: string }) => (
  <div className="d-flex flex-column justify-content-between align-items-center">
    <DatePanel date={props.date} />
    <TargetPanel />
    <HeaderButtons />
  </div>
)
