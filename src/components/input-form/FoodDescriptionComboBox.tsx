import { Fragment, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Suggestion } from "../../features/suggestions/Suggestion";
import { Serving } from "../../model/Food";
import { calcServingCalories } from "../../model/calorieFunction";
import { BlueStar } from "../BlueStar";
import { CalorieSpan } from "../CalorieSpan";
import { FoodGroupServingBadgePanel } from "../panels/FoodGroupServingBadgePanel";

function foodDescription(suggestion: Suggestion) {
  if (suggestion.amount) {
    return suggestion.foodName + " " + suggestion.amount;
  } else {
    return suggestion.foodName;
  }
}

const ItemText = (props: {
  suggestion: Suggestion;
}) => {
  const { bestChoice, serving } = props.suggestion;
  return (
    <div>
      {bestChoice && <BlueStar />}
      {foodDescription(props.suggestion)}
      {serving &&
        <Fragment>
          <FoodGroupServingBadgePanel serving={serving} />
          <CalorieSpan value={calcServingCalories(serving)} />
        </Fragment>
      }
    </div>
  );
}

interface Props {
  foodName: string;
  suggestions: Suggestion[];
  invalid?: boolean;
  updateFoodDescription: (desc: string) => void;
  updateFoodDescriptionServing: (desc: string, serving?: Serving) => void;
}

export const FoodDescriptionComboBox = (props: Props) => {

  const [toggle, setToggle] = useState(false);

  const handleChange = (e: { target: { value: string; }; }) => {
    props.updateFoodDescription(e.target.value);
    setToggle(true);
  }

  const handleItemClick = (suggestion: Suggestion) => {
    props.updateFoodDescriptionServing(foodDescription(suggestion), suggestion.serving);
  }

  return (
    <Dropdown show={toggle} onSelect={() => setToggle(false)}>

      <Form.Label htmlFor="inputFoodDescription">Food description</Form.Label>
      <Form.Control
        id="inputFoodDescription"
        type="text"
        placeholder="Broccoli steamed 1 cup"
        value={props.foodName}
        onChange={handleChange}
        required
        isInvalid={props.invalid}
      />
      <Form.Control.Feedback type="invalid">
        Please enter food description.
      </Form.Control.Feedback>

      <Dropdown.Menu>
        {props.suggestions.map((suggestion, index) => (
          <Dropdown.Item
            key={index}
            as="div"
            onClick={() => handleItemClick(suggestion)}
          >
            <ItemText suggestion={suggestion}/>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
