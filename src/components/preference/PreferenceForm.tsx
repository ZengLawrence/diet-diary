import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const PreferenceForm = () => {
  const [checked, setChecked] = useState(false);
  const [calorieLevel, setCalorieLevel] = useState(undefined as number | undefined);

  const handleToggleChecked = () => setChecked(!checked);
  const handleCalorieLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(e.target.value);
    setCalorieLevel(level);
  };

  return (
    <Form>
      <Row>
        <Col xs="auto">
          <Form.Check
            id="checkBoxStartDayCalorieLevel"
            label="Start day with"
            checked={checked}
            onChange={handleToggleChecked}
          />
        </Col>
        <Col>
          <Form.Select
            value={calorieLevel}
            onChange={handleCalorieLevelChange}
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