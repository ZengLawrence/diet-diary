import type { Serving } from "../../model/Food";
import { FoodGroupServingBadgePanel } from "./FoodGroupServingBadgePanel";
import { CalorieSpan } from "../CalorieSpan";

export const CalorieServingPanel = (props: { calorie: number; serving: Serving}) => (
  <div className="d-flex justify-content-between align-items-center">
    <div className="mr-1"><CalorieSpan value={props.calorie} /></div>
    <FoodGroupServingBadgePanel serving={props.serving} />
  </div>

);
