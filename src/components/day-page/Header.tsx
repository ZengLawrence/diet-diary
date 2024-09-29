import DatePanel from "../../features/day-page/DatePanel";
import HeaderButtons from "../../features/day-page/HeaderButtons";
import TargetCaloriePanel from "../../features/target/TargetCaloriePanel";

export const Header = () => (
  <div className="d-flex flex-column">
    <div className="d-flex justify-content-center mb-1">
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
