import { Fragment } from "react";
import { MealEditState } from "../../features/day-page/mealStatesSlice";
import DoneButton from "../../features/meal-card/DoneButton";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";
import { Meal } from "../../model/Food";
import { MealButton } from "./MealButton";

interface Props {
  editState: MealEditState;
  mealIndex: number;
  meal: Meal;
  editMeal: (mealIndex: number) => void;
  saveMeal: (mealIndex: number, meal: Meal) => void;
}

export const MealButtons = (props: Props) => {
  const editButton = <MealButton variant={VariantPrimary} mealIndex={props.mealIndex} onClick={() => props.editMeal(props.mealIndex)} label="Edit"/>;
  const saveButton = <MealButton variant={VariantSecondary} mealIndex={props.mealIndex} onClick={() => props.saveMeal(props.mealIndex, props.meal)} label="Save"/>;
  const doneButton = <DoneButton variant={VariantPrimary} mealIndex={props.mealIndex} label="Done" />;

  switch (props.editState) {
    case "add":
      return (
        <Fragment>
          {editButton}
        </Fragment>
      );

    case "edit":
      return (
        <Fragment>
          {doneButton}
        </Fragment>
      );

    default:
      return (
        <Fragment>
          {saveButton}&nbsp;
          {editButton}
        </Fragment>
      );
  }
}
