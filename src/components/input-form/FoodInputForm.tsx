import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { calcFoodCalories, displayCalorieValue } from "../../model/calorieFunction";
import { Food } from "../../model/Food";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";
import { FoodDescriptionInputControl } from "./FoodDescriptionInputControl";
import { ServingInputControl } from "./ServingInputControl";
import { useFoodInputFormStateReducer } from "./useFoodInputFormStateReducer";

export type ButtonLabel = "Add" | "Update";

interface Props {
  food: Food;
  buttonLabel: ButtonLabel;
  onSaveFood: (food: Food) => void;
  onCancel: () => void
}

export const FoodInputForm = (props: Props) => {
  const [state, fns] = useFoodInputFormStateReducer(props.food, props.onSaveFood);
  const { food, error, suggestions } = state;
  const { updateFoodDescription, updateFoodDescriptionServing, updateFoodGroupServing, handleSubmit } = fns;

  return (
    <Form
      data-cy={"form" + props.buttonLabel}
      noValidate
      onSubmit={handleSubmit}
      className="border p-1"
    >
      <Form.Group as={Row} className="ml-1 mr-1 mb-3">
        <FoodDescriptionInputControl
          foodName={food.description}
          suggestions={suggestions}
          invalid={error.foodDescription}
          updateFoodDescription={updateFoodDescription}
          updateFoodDescriptionServing={updateFoodDescriptionServing}
        />
      </Form.Group>

      <Form.Group as={Row} controlId="formServings" className="mb-3">
        <div>Servings (Calories: {displayCalorieValue(calcFoodCalories(food))})</div>
        <Row className="justify-content-between">
          <Col xs={4} sm={3} lg={2}>
            <ServingInputControl foodGroup="vegetable" serving={food.serving} isInvalid={error.vegetable} onChange={updateFoodGroupServing} />
          </Col>
          <Col xs={4} sm={3} lg={2}>
            <ServingInputControl foodGroup="fruit" serving={food.serving} isInvalid={error.fruit} onChange={updateFoodGroupServing} />
          </Col>
          <Col xs={4} sm={3} lg={2}>
            <ServingInputControl foodGroup="carbohydrate" serving={food.serving} isInvalid={error.carbohydrate} onChange={updateFoodGroupServing} />
          </Col>
          <Col xs={4} sm={3} lg={2}>
            <ServingInputControl foodGroup="proteinDiary" serving={food.serving} isInvalid={error.proteinDiary} onChange={updateFoodGroupServing} />
          </Col>
          <Col xs={4} sm={3} lg={2}>
            <ServingInputControl foodGroup="fat" serving={food.serving} isInvalid={error.fat} onChange={updateFoodGroupServing} />
          </Col>
          <Col xs={4} sm={3} lg={2}>
            <ServingInputControl foodGroup="sweet" serving={food.serving} isInvalid={error.sweet} onChange={updateFoodGroupServing} />
          </Col>
        </Row>
      </Form.Group>

      <Row>
        <div className="d-flex justify-content-end">
          <Button variant={VariantSecondary} onClick={props.onCancel}>Cancel</Button>&nbsp;
          <Button variant={VariantPrimary} type="submit" >{props.buttonLabel}</Button>
        </div>
      </Row>
    </Form>
  )
}