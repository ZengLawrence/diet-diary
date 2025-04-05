import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Target } from "../../model/Target";
import Col from "react-bootstrap/Col";
import { ServingInputControl } from "../input-form/ServingInputControl";

interface Props {
    target: Target;
}

function updateFoodGroupServing(foodGroup: string, serving: number) {
    // Update the food group serving in the target object
    // This function needs to be implemented
}

const TargetEditForm = (props: Props) => (
    <Form>
        <Form.Group as={Row} controlId="formServings">
            <Row className="justify-content-between">
                <Col xs={4} sm={3} lg={2}>
                    <ServingInputControl foodGroup="vegetable" serving={props.target.serving} isInvalid={false} onChange={updateFoodGroupServing} />
                </Col>
                <Col xs={4} sm={3} lg={2}>
                    <ServingInputControl foodGroup="fruit" serving={props.target.serving} isInvalid={false} onChange={updateFoodGroupServing} />
                </Col>
                <Col xs={4} sm={3} lg={2}>
                    <ServingInputControl foodGroup="carbohydrate" serving={props.target.serving} isInvalid={false} onChange={updateFoodGroupServing} />
                </Col>
                <Col xs={4} sm={3} lg={2}>
                    <ServingInputControl foodGroup="proteinDiary" serving={props.target.serving} isInvalid={false} onChange={updateFoodGroupServing} />
                </Col>
                <Col xs={4} sm={3} lg={2}>
                    <ServingInputControl foodGroup="fat" serving={props.target.serving} isInvalid={false} onChange={updateFoodGroupServing} />
                </Col>
                <Col xs={4} sm={3} lg={2}>
                    <ServingInputControl foodGroup="sweet" serving={props.target.serving} isInvalid={false} onChange={updateFoodGroupServing} />
                </Col>
            </Row>
        </Form.Group>

    </Form>
)

export default TargetEditForm;