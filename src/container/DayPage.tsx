import _ from "lodash";
import { Fragment, useContext } from "react";
import { Button } from "react-bootstrap";
import { Action, enterEditModeAction, exitEditModeAction, newDayAction } from "../actions";
import { AddMealToolBar } from "../components/AddMealToolBar";
import { CalorieServingSummary } from "../components/CalorieServingSummary";
import { MealCard } from "../components/MealCard";
import { MealDispatch } from "../components/MealDispatch";
import { AppState } from "../model/AppState";

const NewDayToolBar = () => {
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  return (
    <Button
      variant="outline-danger"
      className="w-100"
      onClick={() => dispatch(newDayAction())}
    >
      New Day
    </Button>
  );
}

const EditModeButton = (props: { editMode: boolean }) => {
  const { editMode } = props;
  const lable = editMode ? 'Done' : "Edit";
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handleClick = () => editMode ? dispatch(exitEditModeAction()) : dispatch(enterEditModeAction());
  return (
    <Button
      variant="outline-primary"
      onClick={handleClick}
    >
      {lable}
    </Button>
  );
}

export const DayPage = (props: { state: AppState }) => {
  const { date, mealStates, editMode } = props.state;
  const mealCards = _.map(mealStates, (mealState, index) => <MealCard key={index} mealIndex={index} state={mealState} />);
  const toolbars = editMode &&
    (<Fragment>
      <AddMealToolBar />
      <NewDayToolBar />
    </Fragment>
    );


  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center">
        <div />
        <h1 className="text-center">{date}</h1>
        <EditModeButton editMode={editMode} />
      </div>
      <CalorieServingSummary meals={_.map(mealStates, 'meal')} />
      {mealCards}
      {toolbars}
    </Fragment>
  )
}