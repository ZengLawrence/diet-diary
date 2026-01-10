import { PlusLg } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import AddMealButton from "../../features/day-page/AddMealButton";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";

export const AddMealButtons = (props: { showSavedMeals: () => void; }) => (
  <div className="p2 d-flex justify-content-end">
    <AddMealButton data-cy="buttonAddMeal" variant={VariantPrimary}>
      <PlusLg />
    </AddMealButton>&nbsp;
    <Button data-cy="buttonAddSavedMeal" variant={VariantSecondary} onClick={props.showSavedMeals} >
      <PlusLg /> Saved Meal
    </Button>
  </div>
);
