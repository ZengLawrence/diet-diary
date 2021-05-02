import _ from "lodash";
import { Fragment } from "react";
import { AddMealToolBar } from "../components/AddMealToolBar";
import { MealCard } from "../components/MealCard";
import { AppState } from "../model/AppState";

export const DayPage = (props: { state: AppState }) => {
  const { mealStates } = props.state;
  const mealCards = _.map(mealStates, (mealState, index) => <MealCard key={index} mealIndex={index} state={mealState} />);

  return (
    <Fragment>
      {mealCards}
      <AddMealToolBar />
    </Fragment>
  )
}