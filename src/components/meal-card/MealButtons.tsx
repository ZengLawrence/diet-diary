import { Fragment } from "react";
import { MealEditState } from "../../features/day-page/mealStatesSlice";
import { Meal } from "../../model/Food";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";
import { MealButton } from "./MealButton";

interface Props {
  editState: MealEditState;
  mealIndex: number;
  meal: Meal;
  editMeal: (mealIndex: number) => void;
  saveMeal: (mealIndex: number, meal: Meal) => void;
  doneEdit: (mealIndex: number) => void;
}

export const MealButtons = (props: Props) => {
  const editButton = <MealButton variant={VariantPrimary} mealIndex={props.mealIndex} onClick={() => props.editMeal(props.mealIndex)} label="Edit" />;
  const saveButton = <MealButton variant={VariantSecondary} mealIndex={props.mealIndex} onClick={() => props.saveMeal(props.mealIndex, props.meal)} label="Save" />;
  const doneButton = <MealButton variant={VariantPrimary} mealIndex={props.mealIndex} onClick={() => props.doneEdit(props.mealIndex)} label="Done" />;

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
