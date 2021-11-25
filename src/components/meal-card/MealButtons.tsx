import { Fragment } from "react";
import EditButton from "../../features/meal-card/EditButton";
import NameButton from "../../features/meal-card/NameButton";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";

interface Props {
  mealIndex: number;
  showNameButton: boolean;
}

export const MealButtons = (props: Props) => (
  <Fragment>
    {props.showNameButton
      && <NameButton variant={VariantSecondary} mealIndex={props.mealIndex}>Name</NameButton>}&nbsp;
    <EditButton variant={VariantPrimary} mealIndex={props.mealIndex}>Edit</EditButton>
  </Fragment>
);
