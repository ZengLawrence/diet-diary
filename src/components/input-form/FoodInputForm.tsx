import { Button, Form } from "react-bootstrap";
import { calcFoodCalories, displayCalorieValue } from "../../model/calorieFunction";
import { Food } from "../../model/Food";
import { PortionSuggestionFormText } from "./PortionSuggestionFormText";
import { ServingInputControl } from "./ServingInputControl";
import { ServingSuggestionFormText } from "./ServingSuggestionFormText";
import { useFoodInputFormStateReducer } from "./useFoodInputFormStateReducer";

interface Props {
  food: Food;
  buttonLabel: string;
  onSaveFood: (food: Food) => void;
  onCancel: () => void
}

export const FoodInputForm = (props: Props) => {
  const { 
    food, 
    error, 
    servingSuggestions, 
    portionSuggestions, 
    updateFoodName, 
    updateServing, 
    handleSubmit 
  } = useFoodInputFormStateReducer(props.food, props.onSaveFood);

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className="border p-1"
    >

      <Form.Group as={Form.Row} className="ml-1 mr-1">
        <Form.Label htmlFor="inputFoodName" srOnly>Food name</Form.Label>
        <Form.Control
          id="inputFoodName"
          type="text"
          value={food.name}
          required
          placeholder="Broccoli 1 cup, apple 1 small, bread 1 slice, turkey white meat 3 oz, olive oil 1 tsp, maple syrup 1 1/2 tbsp..."
          isInvalid={error.foodName}
          onChange={e => updateFoodName(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter food name.
        </Form.Control.Feedback>
        <div className="d-flex flex-column w-100">
          <ServingSuggestionFormText suggestions={servingSuggestions} />
          <PortionSuggestionFormText suggestions={portionSuggestions} />
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Servings (Calories: {displayCalorieValue(calcFoodCalories(food))})</Form.Label>
        <Form.Group as={Form.Row} controlId="formServings" className="d-flex justify-content-between">
          <ServingInputControl foodGroup="vegetable" serving={food.serving} isInvalid={error.vegetable} onChange={updateServing} />
          <ServingInputControl foodGroup="fruit" serving={food.serving} isInvalid={error.fruit} onChange={updateServing} />
          <ServingInputControl foodGroup="carbohydrate" serving={food.serving} isInvalid={error.carbohydrate} onChange={updateServing} />
          <ServingInputControl foodGroup="proteinDiary" serving={food.serving} isInvalid={error.proteinDiary} onChange={updateServing} />
          <ServingInputControl foodGroup="fat" serving={food.serving} isInvalid={error.fat} onChange={updateServing} />
          <ServingInputControl foodGroup="sweet" serving={food.serving} isInvalid={error.sweet} onChange={updateServing} />
        </Form.Group>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button className="mr-1 order-sm-1" variant="outline-secondary" onClick={props.onCancel}>Cancel</Button>
        <Button className="mr-1 order-sm-0" type="submit" variant="outline-primary">{props.buttonLabel}</Button>
      </div>
    </Form>
  )
}