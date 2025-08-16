import { toString } from "../stringUtil";

interface Props {
  calories: number;
}

export const WeightLossSummary = (props: Props) => (
  <div className="d-flex flex-column justify-content-center border rounded bg-info text-white text-center p-1">
    <div className="fs-1 dd-calorie-summary" >{toString(props.calories)}</div>
    <div>pound</div>
  </div>
);
