import { Form } from "react-bootstrap";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Fragment } from "react";
import { isServingSuggestion, PortionSuggestion, ServingSuggestion, Suggestion } from "../../features/suggestions";
import { BlueStar } from "../BlueStar";
import { FoodGroupLabelBadge } from "../badge";
import { FoodGroupServingBadgePanel } from "../panels/FoodGroupServingBadgePanel";
import { calcServingCalories } from "../../model/calorieFunction";
import { CalorieSpan } from "../CalorieSpan";

function ServingSuggestionDisplayText(props: { suggestion: ServingSuggestion; }) {
  const { bestChoice, foodGroup } = props.suggestion;
  return (
    <Fragment>
      {bestChoice && <BlueStar />}
      <ComboboxOptionText />
      <FoodGroupLabelBadge foodGroup={foodGroup} />
    </Fragment>
  )
}

function PortionSuggestionDisplayText(props: { suggestion: PortionSuggestion; }) {
  const { serving } = props.suggestion;
  return (
    <Fragment>
      <ComboboxOptionText />
      <FoodGroupServingBadgePanel serving={serving} />
      <CalorieSpan value={calcServingCalories(serving)} />
    </Fragment>
  )
}

function DisplayText(props: { suggestion: Suggestion; }) {
  if (isServingSuggestion(props.suggestion)) {
    return <ServingSuggestionDisplayText suggestion={props.suggestion} />;
  } else {
    return <PortionSuggestionDisplayText suggestion={props.suggestion} />;
  }
}

export const FoodNameInputControl = (props: {
  foodName: string;
  suggestions: Suggestion[];
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
              onClick={() => props.updateFoodName(suggestion.foodName)}>
              <DisplayText suggestion={suggestion} />
            </ComboboxOption>
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
    <Form.Control.Feedback type="invalid">
      Please enter food name.
    </Form.Control.Feedback>
  </Fragment>
);
