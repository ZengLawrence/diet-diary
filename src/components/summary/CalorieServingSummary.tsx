import ServingSummary from "../../containers/summary/ServingSummary";
import { calcCaloriesTotal } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { CalorieSummary } from "./CalorieSummary";

export const CalorieServingSummary = (props: { meals: Meal[] }) => (
  <div className="d-flex">
    <CalorieSummary calories={calcCaloriesTotal(props.meals)} />
    <ServingSummary />
  </div>
)