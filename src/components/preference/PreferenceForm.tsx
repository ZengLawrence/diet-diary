import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { preferencesApi } from "../../features/preference/api";

const PreferenceForm = () => {
  const [checked, setChecked] = useState(false);
  const [calorieLevel, setCalorieLevel] = useState(undefined as number | undefined);

  useEffect(() => {
    const getStartDayCalorieTarget = async () => {
      return preferencesApi.getStartDayCalorieTarget();
    };
    void getStartDayCalorieTarget().then(startDayCalorieTarget => {
      setChecked(startDayCalorieTarget.enabled);
      setCalorieLevel(startDayCalorieTarget.level);
    });
  }, []);

  const handleToggleChecked = () => {
    const newValue = preferencesApi.toggleStartDayCalorieTarget();
    setChecked(newValue);
  };
  const handleCalorieLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(e.target.value);
    const newLevel = preferencesApi.setStartDayCalorieTargetLevel(level);
    setCalorieLevel(newLevel);
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