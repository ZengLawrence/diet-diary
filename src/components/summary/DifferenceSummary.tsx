import CalorieDifference from "../../features/summary/CalorieDifference";
import { Meal } from "../../model/Food";
import { calcServingDifference } from "../../model/servingFunction";
import { Target } from "../../model/Target";
import { ServingSummary } from "./ServingSummary";

export const DifferenceSummary = (props: { meals: Meal[]; target: Target; }) => {
  const { meals, target } = props;
  return (
    <div className="d-flex">
      <CalorieDifference />
      <div className="flex-fill">
        <ServingSummary serving={calcServingDifference(meals, target.serving)} />
      </div>
    </div>
  )
}