import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import TargetDropDown from "../../features/target/TargetDropDown";
import TargetFoodGroupServingGoalBadgePanel from "../../features/target/TargetFoodGroupServingGoalBadgePanel";
import TargetLabel from "../../features/target/TargetLabel";
import EditCustomTargetButton from "./EditCustomTargetButton";

export const TargetCaloriePanel = (props: { editTarget: boolean; }) => {
  const { editTarget } = props;
  const caloriePanel = editTarget ? <TargetDropDown /> : <TargetLabel />;
  const customizeButton = editTarget ? <EditCustomTargetButton /> : "";
  
  return (
    <Row className="flex-fill">
      <Col />
      <Col xs="auto" >
        <div>
          <div className="d-flex flex-nowrap  align-items-end">
            Target:&nbsp; {caloriePanel} &nbsp;Cal.
          </div>
          <div className="d-flex flex-nowrap align-items-end">
            <TargetFoodGroupServingGoalBadgePanel />
          </div>
        </div>
      </Col>
      <Col className="align-content-center">
        {customizeButton}
      </Col>
    </Row>
  );
};
