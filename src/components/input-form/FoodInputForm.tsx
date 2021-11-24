import { Button, Form } from "react-bootstrap";
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
      id={"form" + props.buttonLabel}
      noValidate
      onSubmit={handleSubmit}
      className="border p-1"
    >
      <Form.Group as={Form.Row} className="ml-1 mr-1">
        <FoodDescriptionInputControl
          foodName={food.description}
          suggestions={suggestions}
          invalid={error.foodDescription}
          updateFoodDescription={updateFoodDescription}
          updateFoodDescriptionServing= {updateFoodDescriptionServing}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Servings (Calories: {displayCalorieValue(calcFoodCalories(food))})</Form.Label>
        <Form.Group as={Form.Row} controlId="formServings" className="d-flex justify-content-between">
          <ServingInputControl foodGroup="vegetable" serving={food.serving} isInvalid={error.vegetable} onChange={updateFoodGroupServing} />
          <ServingInputControl foodGroup="fruit" serving={food.serving} isInvalid={error.fruit} onChange={updateFoodGroupServing} />
          <ServingInputControl foodGroup="carbohydrate" serving={food.serving} isInvalid={error.carbohydrate} onChange={updateFoodGroupServing} />
          <ServingInputControl foodGroup="proteinDiary" serving={food.serving} isInvalid={error.proteinDiary} onChange={updateFoodGroupServing} />
          <ServingInputControl foodGroup="fat" serving={food.serving} isInvalid={error.fat} onChange={updateFoodGroupServing} />
          <ServingInputControl foodGroup="sweet" serving={food.serving} isInvalid={error.sweet} onChange={updateFoodGroupServing} />
        </Form.Group>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button className="mr-1 order-sm-1" variant={VariantSecondary} onClick={props.onCancel}>Cancel</Button>
        <Button className="mr-1 order-sm-0" variant={VariantPrimary} type="submit" >{props.buttonLabel}</Button>
      </div>
    </Form>
  )
}