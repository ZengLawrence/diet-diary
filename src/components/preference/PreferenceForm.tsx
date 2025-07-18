import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const PreferenceForm = () => {
  return (
    <Form>
      <Row>
        <Col xs="auto">
          <Form.Check
            id="checkBoxStartDayCalorieLevel"
            label="Start day with"
          />
        </Col>
        <Col>
          <Form.Select>
            <option>1200</option>
            <option>1400</option>
            <option>1600</option>
            <option>1800</option>
            <option>1000</option>
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