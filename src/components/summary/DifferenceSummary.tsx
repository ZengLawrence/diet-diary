import ServingSummary from "../../containers/summary/ServingSummary";
import { calcCaloriesDifference } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { Target } from "../../model/Target";
import { CalorieSummary } from "./CalorieSummary";

export const DifferenceSummary = (props: { meals: Meal[]; target: Target; }) => {
  const { meals, target } = props;
  return (
    <div className="d-flex">
      <CalorieSummary calories={calcCaloriesDifference(meals, target.calorie)} />
      <ServingSummary />
    </div>
  )
}