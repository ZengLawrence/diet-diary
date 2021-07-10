import { Form } from "react-bootstrap";
import FoodCalorieServingPanel from "../../features/name-food/FoodCalorieServingPanel";
import { Food } from "../../model/Food";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { SubmitButton } from "../buttons/SubmitButton";
import { FoodItem } from "../FoodItem";
import useNameFoodFormReducer from "./useNameFoodFormReducer";

interface Props {
  foods: Food[];
  onSaveFood: (food: Food) => void;
  onCancel: () => void;
}

export const NameFoodForm = (props: Props) => {
  const { state, fns } = useNameFoodFormReducer(props.foods);
  const { handleSelectFoodChanged } = fns;

  return (
    <Form
      noValidate
      onSubmit={() => props.onSaveFood(state.renamedFood)}
      className="border p-1"
    >

      <Form.Group as={Form.Row} className="d-flex flex-column flex-wrap mx-1">
        {state.foods.map((food, index) =>
          <div key={index} className="d-flex flex-inline">
            <Form.Check
              inline
              type="checkbox"
              aria-label="select food"
              checked={food.selected}
              onChange={e => handleSelectFoodChanged(index, e.target.checked)}
            />
            <FoodItem food={food} />
          </div>
        )}
      </Form.Group>

      <Form.Group as={Form.Row} className="ml-1 mr-1">
        <Form.Label htmlFor="inputFoodName">New food name</Form.Label>
        <Form.Control
          id="inputFoodName"
          type="text"
          value={state.renamedFood.name}
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end" >
        <div className="mr-auto">
          <FoodCalorieServingPanel food={state.renamedFood} />
        </div>
        <div className="d-flex justify-content-end">
          <div className="mr-1 order-sm-1">
            <SecondaryButton label="Cancel" onClick={props.onCancel} />
          </div>
          <div className="mr-1 order-sm-0" >
            <SubmitButton label="Save" />
          </div>
        </div>
      </div>
    </Form>
  )
}