import { ComboboxOptionText } from "@reach/combobox";
import { Fragment } from "react";
import { isPortionSuggestion, isServingSuggestion, PortionSuggestion, ServingSuggestion, Suggestion } from "../../features/suggestions";
import { BlueStar } from "../BlueStar";
import { FoodGroupLabelBadge } from "../badge";
import { FoodGroupServingBadgePanel } from "../panels/FoodGroupServingBadgePanel";
import { calcServingCalories } from "../../model/calorieFunction";
import { CalorieSpan } from "../CalorieSpan";

export const DisplayText = (props: { suggestion: Suggestion; }) => {
  if (isServingSuggestion(props.suggestion)) {
    return <ServingSuggestionDisplayText suggestion={props.suggestion} />;
  } else if (isPortionSuggestion(props.suggestion)) {
    return <PortionSuggestionDisplayText suggestion={props.suggestion} />;
  } else {
    return <ComboboxOptionText />;
  }
};

function ServingSuggestionDisplayText(props: { suggestion: ServingSuggestion; }) {
  const { bestChoice, foodGroup } = props.suggestion;
  return (
    <Fragment>
      {bestChoice && <BlueStar />}
      <ComboboxOptionText />
      <FoodGroupLabelBadge foodGroup={foodGroup} />
    </Fragment>
  );
}

function PortionSuggestionDisplayText(props: { suggestion: PortionSuggestion; }) {
  const { serving } = props.suggestion;
  return (
    <Fragment>
      <ComboboxOptionText />
      <FoodGroupServingBadgePanel serving={serving} />
      <CalorieSpan value={calcServingCalories(serving)} />
    </Fragment>
  );
}
