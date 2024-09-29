import Row from "react-bootstrap/Row";
import DatePanel from "../../features/day-page/DatePanel";
import HeaderButtons from "../../features/day-page/HeaderButtons";
import TargetCaloriePanel from "../../features/target/TargetCaloriePanel";

export const Header = () => (
  <Row className="gy-1">
    <div className="d-flex justify-content-center">
      <DatePanel />
    </div>
    <div className="d-flex justify-content-center">
      <TargetCaloriePanel />
    </div>
    <div className="d-flex flex-column justify-content-between align-items-center">
      <HeaderButtons />
    </div>
  </Row>
)
