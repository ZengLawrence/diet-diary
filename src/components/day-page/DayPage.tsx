import EditableDayPage from "../../features/day-page/EditableDayPage";
import UneditableDayPage from "../../features/day-page/UneditableDayPage";

export const DayPage = (props: { editMode: boolean }) => (
  props.editMode ? <EditableDayPage /> : <UneditableDayPage />
)