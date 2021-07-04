import { Form } from "react-bootstrap";
import FoodCalorieServingPanel from "../../features/name-food/FoodCalorieServingPanel";
import { Food } from "../../model/Food";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { SubmitButton } from "../buttons/SubmitButton";

interface Props {
  food: Food;
}

export const NameFoodForm = (props: Props) => (
  <Form
    noValidate
    onSubmit={() => { }}
    className="border p-1"
  >

    <Form.Group as={Form.Row} className="ml-1 mr-1">
      <Form.Label htmlFor="inputFoodName">Food name</Form.Label>
      <Form.Control
        id="inputFoodName"
        type="text"
        value={props.food.name}
        required
      />
    </Form.Group>

    <div className="d-flex justify-content-end" >
      <div className="mr-auto">
        <FoodCalorieServingPanel food={props.food} />
      </div>
      <div className="d-flex justify-content-end">
        <div className="mr-1 order-sm-1">
          <SecondaryButton label="Cancel" onClick={() => { }} />
        </div>
        <div className="mr-1 order-sm-0" >
          <SubmitButton label="Add" />
        </div>
      </div>
    </div>
  </Form>
)