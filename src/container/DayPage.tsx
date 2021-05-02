import _ from "lodash";
import { Fragment } from "react";
import { AddMealToolBar } from "../components/AddMealToolBar";
import { CalorieServingSummary } from "../components/CalorieServingSummary";
import { MealCard } from "../components/MealCard";
import { AppState } from "../model/AppState";

export const DayPage = (props: { state: AppState }) => {
  const { date, mealStates } = props.state;
  const mealCards = _.map(mealStates, (mealState, index) => <MealCard key={index} mealIndex={index} state={mealState} />);

  return (
    <Fragment>
      <h1 className="text-center">{date}</h1>
      <CalorieServingSummary meals={_.map(mealStates, 'meal')} />
      {mealCards}
      <AddMealToolBar />
    </Fragment>
  )
}