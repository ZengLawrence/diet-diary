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
import { isSuggestion, Suggestion } from "../../features/suggestions";
import { BestChoiceLegend } from "../BestChoiceLegend";
import _ from "lodash";
import { Serving } from "../../model/Food";
import { DisplayText } from "./DisplayText";

function optionText(suggestion: Suggestion) {
  if (isSuggestion(suggestion)) {
    return suggestion.foodName + " " + suggestion.amount;
  } else {
    return suggestion;
  }
}

function hasBestChoice(suggestions: Suggestion[]) {
  return _.findIndex(suggestions, { 'bestChoice': true }) >= 0;
}

function serving(suggestion: Suggestion) {
  if (isSuggestion(suggestion)) {
    return suggestion.serving;
  } else {
    return {} as Serving;
  }
}

export const FoodNameInputControl = (props: {
  foodName: string;
  suggestions: Suggestion[];
  invalid?: boolean;
  updateFoodName: (name: string) => void;
  updateFoodNameServing: (name: string, serving: Serving) => void;
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
              value={optionText(suggestion)}
              onClick={() => props.updateFoodNameServing(optionText(suggestion), serving(suggestion))}>
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
      Please enter food name.
    </Form.Control.Feedback>
  </Fragment>
);
