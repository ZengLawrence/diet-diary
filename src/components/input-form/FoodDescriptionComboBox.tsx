import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Suggestion } from "../../features/suggestions/Suggestion";
import { Serving } from "../../model/Food";

function foodDescription(suggestion: Suggestion) {
  if (suggestion.amount) {
    return suggestion.foodName + " " + suggestion.amount;
  } else {
    return suggestion.foodName;
  }
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

  return (
    <Dropdown show={toggle} onSelect={() => setToggle(false)}>

      <Form.Label htmlFor="inputFoodDescription">Food description</Form.Label>
      <Form.Control
        id="inputFoodDescription"
        type="text"
        placeholder="Broccoli steamed 1 cup"
        value={props.foodName}
        onChange={handleChange}
      />

      <Dropdown.Menu>
        {props.suggestions.map((suggestion, index) => (
          <Dropdown.Item
            key={index}
            as="div"
            onClick={() => props.updateFoodDescriptionServing(foodDescription(suggestion), suggestion.serving)}
            >
            {foodDescription(suggestion)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
