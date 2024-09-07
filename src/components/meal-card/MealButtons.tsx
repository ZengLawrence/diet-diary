import { Fragment } from "react";
import { MealEditState } from "../../features/day-page/mealStatesSlice";
import { Meal } from "../../model/Food";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";
import Button from "react-bootstrap/Button";

interface Props {
  editState: MealEditState;
  mealIndex: number;
  meal: Meal;
  editMeal: (mealIndex: number) => void;
  saveMeal: (mealIndex: number, meal: Meal) => void;
  doneEdit: (mealIndex: number) => void;
}

export const MealButtons = (props: Props) => {
  const editButton = <Button variant={VariantPrimary} onClick={() => props.editMeal(props.mealIndex)}>Edit</Button>;
  const saveButton = <Button variant={VariantSecondary} onClick={() => props.saveMeal(props.mealIndex, props.meal)}>Save</Button>;
  const doneButton = <Button variant={VariantPrimary} onClick={() => props.doneEdit(props.mealIndex)}>Done</Button>;

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
