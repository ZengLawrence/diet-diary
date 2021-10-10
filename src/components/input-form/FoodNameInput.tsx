import { Form } from "react-bootstrap";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Fragment } from "react";

export const FoodNameInput = (props: {
  foodName: string;
  suggestions: { foodName: string; }[];
  invalid?: boolean;
  updateFoodName: (name: string) => void;
}) => (
  <Fragment>
    <Form.Label htmlFor="inputFoodName" srOnly>Food name</Form.Label>
    <Combobox className="w-100">
      <ComboboxInput
        id="inputFoodName"
        type="text"
        value={props.foodName}
        required
        placeholder="Broccoli steamed 1 cup"
        onChange={e => props.updateFoodName(e.target.value)}
        aria-labelledby="inputFoodName"
        className={props.invalid ? "form-control is-invalid" : "form-control"} />
      <ComboboxPopover>
        <ComboboxList aria-labelledby="inputFoodName">
          {props.suggestions.map((suggestion, index) => (
            <ComboboxOption
              key={index}
              value={suggestion.foodName}
              onClick={() => props.updateFoodName(suggestion.foodName)} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
    <Form.Control.Feedback type="invalid">
      Please enter food name.
    </Form.Control.Feedback>
  </Fragment>
);
