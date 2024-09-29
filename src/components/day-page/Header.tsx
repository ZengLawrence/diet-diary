import DatePanel from "../../features/day-page/DatePanel";
import HeaderButtons from "../../features/day-page/HeaderButtons";
import TargetCaloriePanel from "../../features/target/TargetCaloriePanel";

export const Header = () => (
  <div className="d-flex flex-column justify-content-between align-items-center">
    <DatePanel />
    <TargetCaloriePanel />
    <HeaderButtons />
  </div>
)
