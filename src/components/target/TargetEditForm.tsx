import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Target } from "../../model/Target";
import Col from "react-bootstrap/Col";
import { ServingInputControl } from "../input-form/ServingInputControl";
import { Button } from "react-bootstrap";

interface Props {
    target: Target;
    hide: () => void;
}

function updateFoodGroupServing(foodGroup: string, serving: number) {
    // Update the food group serving in the target object
    // This function needs to be implemented
}

const TargetEditForm = (props: Props) => (
    <Form>
        <Row className="justify-content-between mb-3">
            <Col>
                <ServingInputControl foodGroup="vegetable" serving={props.target.serving} onChange={updateFoodGroupServing} />
            </Col>
            <Col>
                <ServingInputControl foodGroup="fruit" serving={props.target.serving} onChange={updateFoodGroupServing} />
            </Col>
            <Col>
                <ServingInputControl foodGroup="carbohydrate" serving={props.target.serving} onChange={updateFoodGroupServing} />
            </Col>
        </Row>
        <Row className="justify-content-between mb-3">
            <Col>
                <ServingInputControl foodGroup="proteinDiary" serving={props.target.serving} onChange={updateFoodGroupServing} />
            </Col>
            <Col>
                <ServingInputControl foodGroup="fat" serving={props.target.serving} onChange={updateFoodGroupServing} />
            </Col>
            <Col>
                <ServingInputControl foodGroup="sweet" serving={props.target.serving} onChange={updateFoodGroupServing} />
            </Col>
        </Row>
        <Row>
            <Button variant="secondary" type="button" onClick={props.hide}>Cancel</Button>
            &nbsp;
            <Button variant="primary" type="submit">Update</Button>
        </Row>
    </Form>
)

export default TargetEditForm;