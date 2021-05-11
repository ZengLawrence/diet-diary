import _ from "lodash";
import { calcMealCalories } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { calcMealsServingSummary } from "../../model/servingFunction";
import { CalorieSummary } from "./CalorieSummary";
import { ServingSummary } from "./ServingSummary";

function calcCaloriesSummary(meals: Meal[]) {
  return _.sum(_.map(meals, calcMealCalories));
}

export const CalorieServingSummary = (props: { meals: Meal[] }) => (
  <div className="d-flex">
    <CalorieSummary calories={calcCaloriesSummary(props.meals)} />
    <ServingSummary serving={calcMealsServingSummary(props.meals)} />
  </div>
)