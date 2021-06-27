import { calcMealCalories } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { calcServingSummary } from "../../model/servingFunction";
import { CalorieServingPanel } from "../panels/CalorieServingPanel";

export const MealCalorieServingPanel = (props: { meal: Meal; }) => (
  <CalorieServingPanel calorie={calcMealCalories(props.meal)} serving={calcServingSummary(props.meal)} />
);
