import _ from "lodash";
import { Fragment, useContext } from "react";
import { Action, enterEditModeAction, exitEditModeAction, newMealAction } from "../actions";
import { AddButton } from "../components/AddButton";
import { CalorieServingSummary } from "../components/CalorieServingSummary";
import { EditModeButton } from "../components/EditModeButton";
import { MealCard } from "../components/MealCard";
import { MealDispatch } from "../components/MealDispatch";
import { NewDayButton } from "../components/NewDayButton";
import { AppState } from "../model/AppState";

const DayEditModeButton = (props: { editMode: boolean }) => {
  const { editMode } = props;
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handleClick = () => editMode ? dispatch(exitEditModeAction()) : dispatch(enterEditModeAction());

  return (
    <EditModeButton editMode={editMode} onClick={handleClick} />
  )
}

const MealAddButton = () => {
  const dispatch = useContext(MealDispatch);

  return (
    <div className="p-2">
      <AddButton onClick={() => dispatch(newMealAction())} />
    </div>
  );
}

export const DayPage = (props: { state: AppState }) => {
  const { date, mealStates, editMode } = props.state;
  const mealCards = _.map(mealStates, (mealState, index) => (
    <MealCard
      key={index}
      mealIndex={index}
      state={mealState}
      editMode={editMode} />)
  );

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center">
        <div />
        <h1 className="text-center">{date}</h1>
        <div>
          {editMode && <NewDayButton />}{' '}
          <DayEditModeButton editMode={editMode} />
        </div>
      </div>
      <CalorieServingSummary meals={_.map(mealStates, 'meal')} />
      {mealCards}
      { editMode && <MealAddButton />}
    </Fragment>
  )
}