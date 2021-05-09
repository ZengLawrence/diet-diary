import _ from "lodash";
import { calcMealCalories } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { calcMealsServingSummary } from "../../model/servingFunction";
import { CalorieSummary } from "./CalorieSummary";
import { GoalSummary } from "./GoalSummary";
import { ServingSummary } from "./ServingSummary";

function calcCaloriesSummary(meals: Meal[]) {
  return _.sum(_.map(meals, calcMealCalories));
}

export const CalorieServingSummary = (props: { meals: Meal[]; goalCalorie: number }) => (
  <div className="d-flex">
    <div className="d-flex flex-column" style={{minWidth: "80px"}}>
      <CalorieSummary calories={calcCaloriesSummary(props.meals)} />
      <GoalSummary calories={props.goalCalorie} />
    </div>
    <ServingSummary serving={calcMealsServingSummary(props.meals)} />
  </div>
)