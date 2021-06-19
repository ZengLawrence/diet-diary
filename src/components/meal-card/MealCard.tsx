import { MealState } from "../../model/MealState";
import { EditableMealCard } from "./EditableMealCard";
import { UneditableMealCard } from "./UneditableMealCard";

interface Props {
  state: MealState;
  mealIndex: number;
  editMode: boolean;
}

export const MealCard = (props: Props) => (
  props.editMode ? <EditableMealCard state={props.state} mealIndex={props.mealIndex} /> : <UneditableMealCard meal={props.state.meal} />
)