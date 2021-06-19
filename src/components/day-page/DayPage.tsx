import { mealsSelector } from "../../app/selectors";
import { AppState } from "../../model/AppState";
import { EditableDayPage } from "./EditableDayPage";
import { UneditableDayPage } from "./UneditableDayPage";

export const DayPage = (props: { state: AppState }) => {
  const { mealStates, editMode } = props.state;

  return (
      editMode ? <EditableDayPage mealStates={mealStates}/> : <UneditableDayPage meals={mealsSelector(props.state)}/>
  )
}