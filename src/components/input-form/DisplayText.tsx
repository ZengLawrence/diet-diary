import { ComboboxOptionText } from "@reach/combobox";
import { Fragment } from "react";
import { Suggestion } from "../../features/suggestions";
import { BlueStar } from "../BlueStar";
import { FoodGroupServingBadgePanel } from "../panels/FoodGroupServingBadgePanel";
import { calcServingCalories } from "../../model/calorieFunction";
import { CalorieSpan } from "../CalorieSpan";

export const DisplayText = (props: { suggestion: Suggestion; }) => {
  const { bestChoice, serving } = props.suggestion;
  return (
    <Fragment>
      {bestChoice && <BlueStar />}
      <ComboboxOptionText />
      {serving &&
        <Fragment>
          <FoodGroupServingBadgePanel serving={serving} />
          <CalorieSpan value={calcServingCalories(serving)} />
        </Fragment>
      }
    </Fragment>
  );
};
