import Form from "react-bootstrap/Form";

const PreferenceForm = () => (
  <Form>
    <Form.Check>
      <Form.Check.Input />
      <Form.Check.Label>
        Start day with&nbsp;
        <Form.Select>
          <option>1200</option>
          <option>1400</option>
          <option>1600</option>
          <option>1800</option>
          <option>1000</option>
        </Form.Select>&nbsp;
        calories
      </Form.Check.Label>
    </Form.Check>
  </Form>
);

export default PreferenceForm;