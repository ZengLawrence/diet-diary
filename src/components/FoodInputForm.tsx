import _ from "lodash";
import { useReducer } from "react";
import { Button, Form } from "react-bootstrap";
import { calcFoodCalories, Food, FoodGroup } from "../model/Food";
import { ServingInputControl } from "./ServingInputControl";

interface Action {
  type: string;
}

interface SetServingAction extends Action {
  type: "set-serving";
  foodGroup: FoodGroup;
  serving: number | undefined;
}

interface SetNameAction extends Action {
  type: "set-name";
  name: string;
}

function setServing(food: Food, action: SetServingAction) {
  return {
    ...food,
    serving: _.set(food.serving, action.foodGroup, action.serving),
  };
}

function setName(food: Food, action: SetNameAction) {
  return {
    ...food,
    name: action.name,
  };
}

function reducer(state: Food, action: Action | SetNameAction | SetServingAction) {
  switch (action.type) {
    case 'set-name':
      return setName(state, action as SetNameAction);
    case 'set-serving':
      return setServing(state, action as SetServingAction);
    case 'reset':
      return initialState();
    default:
      throw new Error();
  }
}

function initialState(): Food {
  return {
    name: "",
    serving: {}
  }
}

export const FoodInputForm = (props: { onAddFood: (food: Food) => void }) => {
  const [food, dispatch] = useReducer(reducer, initialState());
  const handleNameChange = (name: string) => {
    dispatch({
      type: "set-name",
      name
    });
  }

  const handleServingChange = (foodGroup: FoodGroup, serving: number) => {
    dispatch({
      type: "set-serving",
      foodGroup,
      serving
    });
  }

  const handleAdd = (e: React.MouseEvent<HTMLElement>) => {
    props.onAddFood(food);
    dispatch({
      type: "reset"
    });
    e.preventDefault();
  }

  return (
    <Form className="border p-1">
      <Form.Group as={Form.Row} controlId="formFoodName" className="ml-1 mr-1">
        <Form.Label>Food name</Form.Label>
        <Form.Control
          type="text"
          value={food.name}
          required
          placeholder="Bread, broccoli, steak, hamburger..."
          onChange={e => handleNameChange(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Servings (Calories: {calcFoodCalories(food)})</Form.Label>
        <Form.Group controlId="formServings" className="border p-1">
          <ServingInputControl foodGroup="vegetable" serving={food.serving} onChange={handleServingChange} />
          <ServingInputControl foodGroup="fruit" serving={food.serving} onChange={handleServingChange} />
          <ServingInputControl foodGroup="carbohydrate" serving={food.serving} onChange={handleServingChange} />
          <ServingInputControl foodGroup="protein" serving={food.serving} onChange={handleServingChange} />
          <ServingInputControl foodGroup="fat" serving={food.serving} onChange={handleServingChange} />
          <ServingInputControl foodGroup="sweet" serving={food.serving} onChange={handleServingChange} />
        </Form.Group>
      </Form.Group>

      <Button type="submit" variant="primary" onClick={handleAdd}>Add</Button>{' '}
      <Button variant="secondary">Cancel</Button>
    </Form>
  )
}