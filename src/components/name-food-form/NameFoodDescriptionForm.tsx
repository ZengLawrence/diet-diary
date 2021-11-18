import { Form } from "react-bootstrap";
import FoodCalorieServingPanel from "../../features/name-food/FoodCalorieServingPanel";
import { Food } from "../../model/Food";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { SubmitButton } from "../buttons/SubmitButton";
import { FoodGroupServingBadgePanel } from "../panels/FoodGroupServingBadgePanel";
import useNameFoodFormReducer from "./useNameFoodFormReducer";

interface Props {
  foods: Food[];
  onSaveFood: (food: Food, replacedFoodIndices: number[]) => void;
  onCancel: () => void;
}

export const NameFoodDescriptionForm = (props: Props) => {
  const [state, fns] = useNameFoodFormReducer(props.foods, props.onSaveFood);
  const { renamedFood, errors } = state;
  const { handleSelectFoodChanged, handleFoodDescriptionChanged, handleSubmitted } = fns;

  return (
    <Form
      noValidate
      onSubmit={handleSubmitted}
      className="border p-1"
    >

      <Form.Group as={Form.Row} className="d-flex flex-column flex-wrap mx-1">
        {renamedFood.sources.map((food, index) =>
          <div key={index} className="d-flex flex-inline">
            <Form.Check
              type="checkbox"
              label={food.description}
              checked={food.selected}
              onChange={e => handleSelectFoodChanged(index, e.target.checked)}
              isInvalid={errors.selectCount < 2}
              feedback="Please select at least two foods to rename."
              className="mr-auto"
            />
            <FoodGroupServingBadgePanel serving={food.serving}/>
          </div>
        )}
      </Form.Group>

      <Form.Group as={Form.Row} className="ml-1 mr-1">
        <Form.Label htmlFor="inputFoodDescription">New food description</Form.Label>
        <Form.Control
          id="inputFoodDescription"
          type="text"
          value={renamedFood.target.description}
          onChange={e => handleFoodDescriptionChanged(e.target.value)}
          required
          isInvalid={errors.foodDescription}
        />
        <Form.Control.Feedback type="invalid">
          Please enter food description.
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-end" >
        <div className="mr-auto">
          <FoodCalorieServingPanel food={renamedFood.target} />
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