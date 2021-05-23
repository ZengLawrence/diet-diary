import { calcCaloriesTotal } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { calcMealsServingSummary } from "../../model/servingFunction";
import { CalorieSummary } from "./CalorieSummary";
import { ServingSummary } from "./ServingSummary";

export const CalorieServingSummary = (props: { meals: Meal[] }) => (
  <div className="d-flex">
    <CalorieSummary calories={calcCaloriesTotal(props.meals)} />
    <div className="flex-fill">
      <ServingSummary serving={calcMealsServingSummary(props.meals)} />
    </div>
  </div>
)