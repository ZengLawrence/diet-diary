import { calcCaloriesDifference } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { Goal } from "../../model/Goal";
import { calcServingDifference } from "../../model/servingFunction";
import { CalorieSummary } from "./CalorieSummary";
import { ServingSummary } from "./ServingSummary";

export const DifferenceSummary = (props: { meals: Meal[]; goal: Goal; }) => {
  const {meals, goal} = props;
  return (
    <div className="d-flex">
      <CalorieSummary calories={calcCaloriesDifference(meals, goal.calorie)} />
      <ServingSummary serving={calcServingDifference(meals, goal.serving)} />
    </div>
  )
}