import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface Props {
  checkedStartDayCalorieLevel: boolean;
  toggleCheckedStartDayCalorieLevel: () => void;
  startDayCalorieLevel: number | undefined;
  setStartDayCalorieLevel: (calorieLevel: number) => void;
}

const PreferenceForm = (props: Props) => {
  return (
    <Form>
      <Row>
        <Col xs="auto">
          <Form.Check
            id="checkBoxStartDayCalorieLevel"
            label="Start day with"
            checked={props.checkedStartDayCalorieLevel}
            onChange={props.toggleCheckedStartDayCalorieLevel}
          />
        </Col>
        <Col>
          <Form.Select 
            value={props.startDayCalorieLevel}
            onChange={e => props.setStartDayCalorieLevel(parseInt(e.target.value))}
            >
            <option>1200</option>
            <option>1400</option>
            <option>1600</option>
            <option>1800</option>
            <option>2000</option>
          </Form.Select>
        </Col>
        <Col>
          calories
        </Col>
      </Row>
    </Form>
  );
}

export default PreferenceForm;