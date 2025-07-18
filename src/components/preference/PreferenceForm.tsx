import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface Props {
  startDayCalorie: {
    checked: boolean;
    toggleChecked: () => void;
    level: number | undefined;
    setLevel: (calorieLevel: number) => void;
  }
}

const PreferenceForm = (props: Props) => {
  const { startDayCalorie } = props;

  return (
    <Form>
      <Row>
        <Col xs="auto">
          <Form.Check
            id="checkBoxStartDayCalorieLevel"
            label="Start day with"
            checked={startDayCalorie.checked}
            onChange={startDayCalorie.toggleChecked}
          />
        </Col>
        <Col>
          <Form.Select
            value={startDayCalorie.level}
            onChange={e => startDayCalorie.setLevel(parseInt(e.target.value))}
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