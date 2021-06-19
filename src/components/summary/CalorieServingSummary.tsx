import CalorieSummary from "../../features/summary/CalorieSummary";
import { Meal } from "../../model/Food";
import { calcMealsServingSummary } from "../../model/servingFunction";
import { ServingSummary } from "./ServingSummary";

export const CalorieServingSummary = (props: { meals: Meal[] }) => (
  <div className="d-flex">
    <CalorieSummary />
    <div className="flex-fill">
      <ServingSummary serving={calcMealsServingSummary(props.meals)} />
    </div>
  </div>
)