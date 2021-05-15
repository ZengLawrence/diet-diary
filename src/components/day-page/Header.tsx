import { AppState } from "../../model/AppState";
import { DayEditModeButton } from "./DayEditModeButton";
import { GoalPanel } from "./GoalPanel";
import { NewDayButton } from "./NewDayButton";

export const Header = (props: { state: AppState; }) => {
  const { date, editMode, goal, editGoal } = props.state;

  return (
    <div className="d-flex justify-content-between align-items-center">
      <GoalPanel goal={goal} editMode={editMode} editGoal={editGoal} />
      <h1 className="text-center">{date}</h1>
      <div>
        {editMode && <NewDayButton />}{' '}
        <DayEditModeButton editMode={editMode} />
      </div>
    </div>
  );
};
