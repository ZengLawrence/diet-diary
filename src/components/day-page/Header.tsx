import { useContext } from "react";
import { Action, enterEditModeAction, exitEditModeAction } from "../../actions";
import { AppState } from "../../model/AppState";
import { Goal } from "../../model/Goal";
import { EditModeButton } from "../EditModeButton";
import { FoodGroupServingBadgePanel } from "../FoodGroupServingBadgePanel";
import { MealDispatch } from "../MealDispatch";
import { NewDayButton } from "./NewDayButton";

const GoalLabel = (props: { goal: Goal; }) => {
  const { goal } = props;
  return (
    <div>
      <div className="d-flex flex-nowrap  align-items-end">
        Goal:&nbsp;<span className="text-white bg-primary border rounded px-1" style={{ fontSize: '24px' }}>{goal.calorie}</span>&nbsp;Cal.
    </div>
      <FoodGroupServingBadgePanel serving={goal.serving} goal />
    </div>
  );
}

const DayEditModeButton = (props: { editMode: boolean; }) => {
  const { editMode } = props;
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handleClick = () => editMode ? dispatch(exitEditModeAction()) : dispatch(enterEditModeAction());

  return (
    <EditModeButton editMode={editMode} onClick={handleClick} />
  );
};

export const Header = (props: { state: AppState; }) => {
  const { date, editMode, goal } = props.state;

  return (
    <div className="d-flex justify-content-between align-items-center">
      <GoalLabel goal={goal} />
      <h1 className="text-center">{date}</h1>
      <div>
        {editMode && <NewDayButton />}{' '}
        <DayEditModeButton editMode={editMode} />
      </div>
    </div>
  );
};
