import { calcCaloriesDifference } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { calcServingDifference } from "../../model/servingFunction";
import { Target } from "../../model/Target";
import { CalorieSummary } from "./CalorieSummary";
import { ServingSummary } from "./ServingSummary";

export const DifferenceSummary = (props: { meals: Meal[]; target: Target; }) => {
  const { meals, target } = props;
  return (
    <div className="d-flex">
      <CalorieSummary calories={calcCaloriesDifference(meals, target.calorie)} />
      <ServingSummary serving={calcServingDifference(meals, target.serving)} />
    </div>
  )
}