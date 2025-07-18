import HeaderButtons from "../../features/day-page/HeaderButtons";
import TargetCaloriePanel from "../../features/target/TargetCaloriePanel";
import DatePanel from "../date-panel/DatePanel";

export const Header = () => (
  <div className="d-flex flex-column flex-fill">
    <div id="header-date-row" className="d-flex justify-content-center mb-1">
      <DatePanel />
    </div>
    <div className="d-flex justify-content-center mb-1">
      <TargetCaloriePanel />
    </div>
    <div className="d-flex justify-content-center">
      <HeaderButtons />
    </div>
  </div>
)
