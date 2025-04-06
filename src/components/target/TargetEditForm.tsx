import _ from "lodash";
import { useReducer } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FoodGroup } from "../../model/Food";
import { Target } from "../../model/Target";
import { ServingInputControl } from "../input-form/ServingInputControl";
import { calcFoodCalories, toIntString } from "../../model/calorieFunction";

function reducer(state: Target, action: { type: FoodGroup; payload: number }): Target {
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

interface Error {
    vegetable: boolean;
    fruit: boolean;
    carbohydrate: boolean;
    proteinDiary: boolean;
    fat: boolean;
    sweet: boolean;
}

function errorReducer(state: Error, action: { type: FoodGroup; payload: boolean }): Error {
    switch (action.type) {
        case "vegetable":
            return { ...state, vegetable: action.payload };
        case "fruit":
            return { ...state, fruit: action.payload };
        case "carbohydrate":
            return { ...state, carbohydrate: action.payload };
        case "proteinDiary":
            return { ...state, proteinDiary: action.payload };
        case "fat":
            return { ...state, fat: action.payload };
        case "sweet":
            return { ...state, sweet: action.payload };
        default:
            return state;
    }
}

const INIT_ERROR_STATE: Error = {
    vegetable: false,
    fruit: false,
    carbohydrate: false,
    proteinDiary: false,
    fat: false,
    sweet: false
};

function hasError(error: Error): boolean {
    return error.vegetable || error.fruit || error.carbohydrate || error.proteinDiary || error.fat || error.sweet;
}

interface Props {
    target: Target;
    hide: () => void;
    update: (target: Target) => void;
}

const TargetEditForm = (props: Props) => {

    const [target, dispatch] = useReducer(reducer, props.target);
    const [error, dispatchError] = useReducer(errorReducer, INIT_ERROR_STATE);

    const updateFoodGroupServing = (foodGroup: FoodGroup, serving: number) => {
        const isValid = serving >= 0 && serving <= 9;
        dispatchError({ type: foodGroup, payload: !isValid });
        if (isValid) {
            dispatch({ type: foodGroup, payload: _.toInteger(serving) });
        }
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (hasError(error)) {
            return;
        }

        props.update(target);
        props.hide();
    };

    return (
        <Form>
            <Row>Servings (Calories: {toIntString(calcFoodCalories(target))})</Row>
            <Row className="justify-content-between mb-3">
                <Col>
                    <ServingInputControl foodGroup="vegetable" serving={target.serving} useNumeric={true} isInvalid={error.vegetable} onChange={updateFoodGroupServing} />
                </Col>
                <Col>
                    <ServingInputControl foodGroup="fruit" serving={target.serving} useNumeric={true} isInvalid={error.fruit} onChange={updateFoodGroupServing} />
                </Col>
                <Col>
                    <ServingInputControl foodGroup="carbohydrate" serving={target.serving} useNumeric={true} isInvalid={error.carbohydrate} onChange={updateFoodGroupServing} />
                </Col>
            </Row>
            <Row className="justify-content-between mb-3">
                <Col>
                    <ServingInputControl foodGroup="proteinDiary" serving={target.serving} useNumeric={true} isInvalid={error.proteinDiary} onChange={updateFoodGroupServing} />
                </Col>
                <Col>
                    <ServingInputControl foodGroup="fat" serving={target.serving} useNumeric={true} isInvalid={error.fat} onChange={updateFoodGroupServing} />
                </Col>
                <Col>
                    <ServingInputControl foodGroup="sweet" serving={target.serving} useNumeric={true} isInvalid={error.sweet} onChange={updateFoodGroupServing} />
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