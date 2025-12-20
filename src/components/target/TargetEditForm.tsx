import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { customTargets } from "../../features/target";
import { calcFoodCalories } from "../../model/calorieFunction";
import type { Target} from "../../model/customTarget";
import { retrieval, validation } from "../../model/customTarget";
import type { FoodGroup, Serving } from "../../model/Food";
import { ServingInputControl } from "../form/ServingInputControl";
import { toIntString } from "../stringUtil";

type FoodGroupServingAction = {
    type: FoodGroup;
    payload: number;
}

type TargetAction = {
    type: "all";
    payload: Serving;
}

function reducer(state: Target, action: FoodGroupServingAction | TargetAction): Target {
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
        case "all":
            return { ...state, serving: { ...state.serving, ...action.payload } };
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
}

const { getDefaultTarget } = retrieval;
const { totalCaloriesLimit, exceedsTotalCaloriesLimit, isServingWithInRange } = validation;

const TargetEditForm = (props: Props) => {

    const { calorie: calorieLevel } = props.target;
    const limit = totalCaloriesLimit(calorieLevel);

    const [target, dispatch] = useReducer(reducer, props.target);
    const [error, dispatchError] = useReducer(errorReducer, INIT_ERROR_STATE);
    const [totalExceeds, setTotalExceeds] = useState(exceedsTotalCaloriesLimit(target, calorieLevel));
    useEffect(() => {
        setTotalExceeds(exceedsTotalCaloriesLimit(target, calorieLevel));
    }, [target, calorieLevel]);

    const updateFoodGroupServing = (foodGroup: FoodGroup, serving: number) => {
        const validServing = isServingWithInRange(serving);
        dispatchError({ type: foodGroup, payload: !validServing });
        if (validServing) {
            dispatch({ type: foodGroup, payload: _.toInteger(serving) });
        }
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (hasError(error) || totalExceeds) {
            return;
        }

        customTargets.update(target);
        props.hide();
    };

    const handleReset = () => {
        const defaultTarget = getDefaultTarget(props.target.calorie);
        dispatch({ type: "all", payload: defaultTarget.serving });
    }

    return (
        <Form>
            <Row>
                <InputGroup hasValidation>
                    <div>Servings (Calories: {toIntString(calcFoodCalories(target))})</div>
                    <Form.Control type="hidden" isInvalid={totalExceeds} />
                    <Form.Control.Feedback type="invalid">
                        Total calories must be less and equal to {limit}.
                    </Form.Control.Feedback>
                </InputGroup>
            </Row>
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
                <Col>
                    <Button variant="secondary" type="button" onClick={handleReset}>Reset</Button>
                </Col>
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