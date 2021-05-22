import { Button, Form } from "react-bootstrap";
import { calcFoodCalories } from "../../model/calorieFunction";
import { Food } from "../../model/Food";
import { ServingInputControl } from "./ServingInputControl";
import { useInputFormStateFunction } from "./useInputFormStateFunction";

interface Props {
  food: Food;
  buttonLabel: string;
  onAddFood: (food: Food) => void;
  onCancel: () => void
}

export const FoodInputForm = (props: Props) => {
  const { state, handleNameChange, handleServingChange, handleSubmit } = useInputFormStateFunction(props.food, props.onAddFood);
  const { food, error } = state;

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
          placeholder="Broccoli, apple, bread, turkey, olive oil, cake..."
          isInvalid={error.foodName}
          onChange={e => handleNameChange(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter food name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Servings (Calories: {calcFoodCalories(food)})</Form.Label>
        <Form.Group as={Form.Row} controlId="formServings" className="d-flex justify-content-between">
          <ServingInputControl foodGroup="vegetable" serving={food.serving} isInvalid={error.vegetable} onChange={handleServingChange} />
          <ServingInputControl foodGroup="fruit" serving={food.serving} isInvalid={error.fruit} onChange={handleServingChange} />
          <ServingInputControl foodGroup="carbohydrate" serving={food.serving} isInvalid={error.carbohydrate} onChange={handleServingChange} />
          <ServingInputControl foodGroup="proteinDiary" serving={food.serving} isInvalid={error.proteinDiary} onChange={handleServingChange} />
          <ServingInputControl foodGroup="fat" serving={food.serving} isInvalid={error.fat} onChange={handleServingChange} />
          <ServingInputControl foodGroup="sweet" serving={food.serving} isInvalid={error.sweet} onChange={handleServingChange} />
        </Form.Group>
      </Form.Group>

      <Button type="submit" variant="outline-primary">{props.buttonLabel}</Button>{' '}
      <Button variant="outline-secondary" onClick={props.onCancel}>Cancel</Button>
    </Form>
  )
}