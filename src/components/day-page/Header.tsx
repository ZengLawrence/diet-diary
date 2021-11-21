import TargetPanel from "../../features/target/TargetPanel";
import { HeaderButtons } from "./HeaderButtons";

export const Header = (props: { date: string; editMode: boolean; }) => (
  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
    <h1 className="order-md-1">{props.date}</h1>
    <div className="order-md-0">
      <TargetPanel />
    </div>
    <div className="order-md-2">
      <HeaderButtons editMode={props.editMode} />
    </div>
  </div>
)
