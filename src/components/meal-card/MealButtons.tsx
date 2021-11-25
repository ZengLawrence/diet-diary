import { Fragment } from "react";
import { MealEditState } from "../../features/day-page/mealStatesSlice";
import DeleteButton from "../../features/meal-card/DeleteButton";
import DoneButton from "../../features/meal-card/DoneButton";
import EditButton from "../../features/meal-card/EditButton";
import NameButton from "../../features/meal-card/NameButton";
import { VariantDanger, VariantPrimary, VariantSecondary } from "../ButtonVariant";

interface Props {
  editState: MealEditState;
  mealIndex: number;
  showNameButton: boolean;
}

export const MealButtons = (props: Props) => {
  const editButton = <EditButton variant={VariantPrimary} mealIndex={props.mealIndex}>Edit</EditButton>;
  const deleteButton = <DeleteButton variant={VariantDanger} mealIndex={props.mealIndex}>Delete</DeleteButton>;
  const nameButton = <NameButton variant={VariantSecondary} mealIndex={props.mealIndex}>Name</NameButton>;
  const doneButton = <DoneButton variant={VariantPrimary} mealIndex={props.mealIndex}>Done</DoneButton>;

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
          {props.showNameButton && nameButton}&nbsp;
          {editButton}
        </Fragment>
      );
  }
}
