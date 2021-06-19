import EditableDayPage from "../../features/day-page/EditableDayPage";
import UneditableDayPage from "../../features/day-page/UneditableDayPage";
import { AppState } from "../../model/AppState";

export const DayPage = (props: { state: AppState }) => {
  const { editMode } = props.state;

  return (
    editMode ? <EditableDayPage /> : <UneditableDayPage />
  )
}