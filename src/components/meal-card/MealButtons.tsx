import { Fragment } from "react";
import { MealEditState } from "../../features/day-page/mealStatesSlice";
import DeleteButton from "../../features/meal-card/DeleteButton";
import DoneButton from "../../features/meal-card/DoneButton";
import EditButton from "../../features/meal-card/EditButton";
import { VariantDanger, VariantPrimary, VariantSecondary } from "../ButtonVariant";
import { SaveButton } from "./SaveButton";

interface Props {
  editState: MealEditState;
  mealIndex: number;
}

export const MealButtons = (props: Props) => {
  const editButton = <EditButton variant={VariantPrimary} mealIndex={props.mealIndex} label="Edit"/>;
  const deleteButton = <DeleteButton variant={VariantDanger} mealIndex={props.mealIndex} label="Delete" />;
  const saveButton = <SaveButton variant={VariantSecondary} mealIndex={props.mealIndex} />;
  const doneButton = <DoneButton variant={VariantPrimary} mealIndex={props.mealIndex} label="Done" />;

  switch (props.editState) {
    case "add":
      return (
        <Fragment>
          {deleteButton}&nbsp;
          {editButton}
        </Fragment>
      );

    case "edit":
      return (
        <Fragment>
          {deleteButton}&nbsp;
          {doneButton}
        </Fragment>
      );

    case "name":
      return (
        <Fragment>
          {editButton}
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
