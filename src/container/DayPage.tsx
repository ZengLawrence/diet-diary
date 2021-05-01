import _ from "lodash";
import { Fragment, useContext } from "react";
import { AddFoodAction } from "../actions";
import { AddMealToolBar } from "../components/AddMealToolBar";
import { FoodInputForm } from "../components/FoodInputForm";
import { MealCard } from "../components/MealCard";
import { MealDispatch } from "../components/MealDispatch";
import { AppState } from "../model/AppState";
import { Food } from "../model/Food";

export const DayPage = (props: { state: AppState }) => {
  const { mealStates } = props.state;
  const mealCards = _.map(mealStates, (mealState, index) => <MealCard key={index} state={mealState} />);

  const dispatch: React.Dispatch<AddFoodAction> = useContext(MealDispatch);
  const handlAddFood = (food: Food) => {
    dispatch({
      type: "add-food",
      food,
      mealIndex: _.size(mealStates) - 1
    })
  }

  return (
    <Fragment>
      {mealCards}
      <FoodInputForm onAddFood={handlAddFood} />
      <AddMealToolBar />
    </Fragment>
  )
}