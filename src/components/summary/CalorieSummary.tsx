import { displayCalorieValue } from "../../model/calorieFunction";

export const CalorieSummary = (props: { calories: number; }) => (
  <div className="d-flex flex-column justify-content-center border rounded bg-info dd-text-yellow text-center p-1">
    <div style={{ fontSize: '40px', width: '110px' }}>{displayCalorieValue(props.calories)}</div>
    <div>calories</div>
  </div>
);
