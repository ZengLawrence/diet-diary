import { Fragment } from "react";
import Button from "react-bootstrap/Button";
import { MealEditState } from "../../features/day-page/pageOptionsSlice";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";

interface Props {
  editState: MealEditState;
  editMeal: () => void;
  saveMeal: () => void;
  doneEdit: () => void;
}

export const MealButtons = (props: Props) => {
  const editButton = <Button variant={VariantPrimary} onClick={props.editMeal}>Edit</Button>;
  const saveButton = <Button variant={VariantSecondary} onClick={props.saveMeal}>Save</Button>;
  const doneButton = <Button variant={VariantPrimary} onClick={props.doneEdit}>Done</Button>;

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
