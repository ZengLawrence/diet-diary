import { Serving } from "../../model/Food";
import { CalorieSummary } from "./CalorieSummary";
import { ServingSummary } from "./ServingSummary";

export const DifferenceSummary = (props: { calories: number; serving: Serving }) => (
  <div className="d-flex">
    <CalorieSummary calories={props.calories} />
    <ServingSummary serving={props.serving} />
  </div>
)