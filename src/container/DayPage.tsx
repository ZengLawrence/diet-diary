import _ from "lodash";
import { Fragment, useContext } from "react";
import { AddFoodAction } from "../actions";
import { FoodInputForm } from "../components/FoodInputForm";
import { MealCard } from "../components/MealCard";
import { AddMealToolBar } from "../components/AddMealToolBar";
import { MealDispatch } from "../components/MealDispatch";
import { Food, Meal } from "../model/Food";

export const DayPage = (props: { meals: Meal[]; editState?: string }) => {
  const { meals, editState } = props;
  const mealCards = _.map(meals, (meal, index) => <MealCard key={index} meal={meal} />);

  const dispatch: React.Dispatch<AddFoodAction> = useContext(MealDispatch);
  const handlAddFood = (food: Food) => {
    dispatch({
      type: "add-food",
      food,
      mealIndex: _.size(meals) - 1
    })
  }

  return (
    <Fragment>
      {mealCards}
      {editState === "add" && <FoodInputForm onAddFood={handlAddFood} />}
      <AddMealToolBar />
    </Fragment>
  )
}