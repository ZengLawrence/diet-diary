import { calcMealCalories, displayCalorieValue } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { calcServingSummary } from "../../model/servingFunction";
import { FoodGroupServingBadgePanel } from "../badge/FoodGroupServingBadgePanel";

export const MealCalorieServingPanel = (props: { meal: Meal; }) => (
  <div className="d-flex justify-content-between align-items-center">
    <div className="mr-1">{displayCalorieValue(calcMealCalories(props.meal))}{' '}Cal.</div>
    <FoodGroupServingBadgePanel serving={calcServingSummary(props.meal)} />
  </div>

);
