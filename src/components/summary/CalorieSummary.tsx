import { toIntString } from "../../model/calorieFunction";

export const CalorieSummary = (props: { calories: number; }) => (
  <div className="d-flex flex-column justify-content-center border rounded bg-info text-white text-center p-1">
    <div className="fs-1 dd-summary-total-width" >{toIntString(props.calories)}</div>
    <div>calories</div>
  </div>
);
