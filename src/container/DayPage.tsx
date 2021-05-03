import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { Fragment, useContext } from "react";
import { Action, newDayAction } from "../actions";
import { AddMealToolBar } from "../components/AddMealToolBar";
import { CalorieServingSummary } from "../components/CalorieServingSummary";
import { MealCard } from "../components/MealCard";
import { MealDispatch } from "../components/MealDispatch";
import { AppState } from "../model/AppState";

export const DayPage = (props: { state: AppState }) => {
  const { date, mealStates } = props.state;
  const mealCards = _.map(mealStates, (mealState, index) => <MealCard key={index} mealIndex={index} state={mealState} />);
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);

  return (
    <Fragment>
      <h1 className="text-center">
        {date}{' '}<FontAwesomeIcon icon={faCalendarPlus} className="text-primary" onClick={() => dispatch(newDayAction())} />
      </h1>
      <CalorieServingSummary meals={_.map(mealStates, 'meal')} />
      {mealCards}
      <AddMealToolBar />
    </Fragment>
  )
}