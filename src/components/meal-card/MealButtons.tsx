import { Fragment } from "react";
import { MealEditState } from "../../features/day-page/mealStatesSlice";
import DoneButton from "../../features/meal-card/DoneButton";
import EditButton from "../../features/meal-card/EditButton";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";
import { SaveButton } from "./SaveButton";
import { Meal } from "../../model/Food";

interface Props {
  editState: MealEditState;
  mealIndex: number;
  meal: Meal;
  saveMeal: (mealIndex: number, meal: Meal) => void;
}

export const MealButtons = (props: Props) => {
  const editButton = <EditButton variant={VariantPrimary} mealIndex={props.mealIndex} label="Edit"/>;
  const saveButton = <SaveButton variant={VariantSecondary} mealIndex={props.mealIndex} handleClick={() => props.saveMeal(props.mealIndex, props.meal)}/>;
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
