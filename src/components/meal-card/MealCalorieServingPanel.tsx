import { calcMealCalories } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { calcServingSummary } from "../../model/servingFunction";
import { FoodGroupServingBadgePanel } from "../badge/FoodGroupServingBadgePanel";
import { CalorieSpan } from "../CalorieSpan";

export const MealCalorieServingPanel = (props: { meal: Meal; }) => (
  <div className="d-flex justify-content-between align-items-center">
    <div className="mr-1"><CalorieSpan value={calcMealCalories(props.meal)} /></div>
    <FoodGroupServingBadgePanel serving={calcServingSummary(props.meal)} />
  </div>

);
