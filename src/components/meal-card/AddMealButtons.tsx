import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import AddMealButton from "../../features/day-page/AddMealButton";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";

export const AddMealButtons = (props: { showSavedMeals: () => void; }) => (
  <div className="p2 d-flex justify-content-end">
    <AddMealButton data-cy="buttonAddMeal" variant={VariantPrimary}>
      <FontAwesomeIcon icon={faPlus} />
    </AddMealButton>&nbsp;
    <Button data-cy="buttonAddSavedMeal" variant={VariantSecondary} onClick={props.showSavedMeals}>
      <FontAwesomeIcon icon={faPlus} /> Saved Meal
    </Button>
  </div>
);
