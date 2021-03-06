import {
  Combobox,
  ComboboxInput, ComboboxList,
  ComboboxOption, ComboboxPopover
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import _ from "lodash";
import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { Suggestion } from "../../features/suggestions";
import { Serving } from "../../model/Food";
import { BestChoiceLegend } from "../BestChoiceLegend";
import { DisplayText } from "./DisplayText";

function foodDescription(suggestion: Suggestion) {
  if (suggestion.amount) {
    return suggestion.foodName + " " + suggestion.amount;
  } else {
    return suggestion.foodName;
  }
}

function hasBestChoice(suggestions: Suggestion[]) {
  return _.findIndex(suggestions, { 'bestChoice': true }) >= 0;
}

export const FoodDescriptionInputControl = (props: {
  foodName: string;
  suggestions: Suggestion[];
  invalid?: boolean;
  updateFoodDescription: (desc: string) => void;
  updateFoodDescriptionServing: (desc: string, serving?: Serving) => void;
}) => (
  <Fragment>
    <Form.Label htmlFor="inputFoodDescription" srOnly>Food description</Form.Label>
    <Combobox className="w-100">
      <ComboboxInput
        id="inputFoodDescription"
        type="text"
        value={props.foodName}
        required
        placeholder="Broccoli steamed 1 cup"
        onChange={e => props.updateFoodDescription(e.target.value)}
        aria-labelledby="inputFoodDescription"
        className={props.invalid ? "form-control is-invalid" : "form-control"} />
      <ComboboxPopover>
        <ComboboxList aria-labelledby="inputFoodDescription">
          {props.suggestions.map((suggestion, index) => (
            <ComboboxOption
              key={index}
              value={foodDescription(suggestion)}
              onClick={() => props.updateFoodDescriptionServing(foodDescription(suggestion), suggestion.serving)}>
              <DisplayText suggestion={suggestion} />
            </ComboboxOption>
          ))}
        </ComboboxList>
        <div style={{ maxWidth: "100px" }}>
          {hasBestChoice(props.suggestions) && <BestChoiceLegend />}
        </div>
      </ComboboxPopover>
    </Combobox>
    <Form.Control.Feedback type="invalid">
      Please enter food description.
    </Form.Control.Feedback>
  </Fragment>
);
