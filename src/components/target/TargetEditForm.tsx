import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Target } from "../../model/Target";
import Col from "react-bootstrap/Col";
import { ServingInputControl } from "../input-form/ServingInputControl";
import { Button } from "react-bootstrap";
import { FoodGroup } from "../../model/Food";
import { useReducer } from "react";

function reducer(state: Target, action: { type: FoodGroup; payload: number }) : Target {
    switch (action.type) {
        case "vegetable":
            return { ...state, serving: { ...state.serving, vegetable: action.payload } };
        case "fruit":
            return { ...state, serving: { ...state.serving, fruit: action.payload } };
        case "carbohydrate":
            return { ...state, serving: { ...state.serving, carbohydrate: action.payload } };
        case "proteinDiary":
            return { ...state, serving: { ...state.serving, proteinDiary: action.payload } };
        case "fat":
            return { ...state, serving: { ...state.serving, fat: action.payload } };
        case "sweet":
            return { ...state, serving: { ...state.serving, sweet: action.payload } };
        default:
            return state;
    }
}

interface Props {
    target: Target;
    hide: () => void;
    update: (target: Target) => void;
}

const TargetEditForm = (props: Props) => {

    const [target, dispatch] = useReducer(reducer, props.target);

    const updateFoodGroupServing = (foodGroup: FoodGroup, serving: number) => 
        dispatch({ type: foodGroup, payload: serving });

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.update(target);
        props.hide();
    };
    
    return (
        <Form>
            <Row className="justify-content-between mb-3">
                <Col>
                    <ServingInputControl foodGroup="vegetable" serving={target.serving} onChange={updateFoodGroupServing} />
                </Col>
                <Col>
                    <ServingInputControl foodGroup="fruit" serving={target.serving} onChange={updateFoodGroupServing} />
                </Col>
                <Col>
                    <ServingInputControl foodGroup="carbohydrate" serving={target.serving} onChange={updateFoodGroupServing} />
                </Col>
            </Row>
            <Row className="justify-content-between mb-3">
                <Col>
                    <ServingInputControl foodGroup="proteinDiary" serving={target.serving} onChange={updateFoodGroupServing} />
                </Col>
                <Col>
                    <ServingInputControl foodGroup="fat" serving={target.serving} onChange={updateFoodGroupServing} />
                </Col>
                <Col>
                    <ServingInputControl foodGroup="sweet" serving={target.serving} onChange={updateFoodGroupServing} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col />
                <Col xs="auto">
                    <Button variant="secondary" type="button" onClick={props.hide}>Cancel</Button>&nbsp;
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Update</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default TargetEditForm;