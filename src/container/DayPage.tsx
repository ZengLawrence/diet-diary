import _ from "lodash";
import { Fragment } from "react";
import { AddMealToolBar } from "../components/AddMealToolBar";
import { CalorieServingSummary } from "../components/CalorieServingSummary";
import { MealCard } from "../components/MealCard";
import { AppState } from "../model/AppState";
import { NewDayToolBar } from "../components/NewDayToolBar";
import { EditModeButton } from "../components/EditModeButton";

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