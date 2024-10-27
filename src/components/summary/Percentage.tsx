import { toIntString } from "../../model/calorieFunction";

const ValueSpan = (props: { value: number; }) => (
  <span className="fs-1">
    {toIntString(props.value)}
  </span>
)

export const Percentage = (props: { value: number; }) => (
  <div className="d-flex flex-column justify-content-center border rounded bg-info text-white text-center p-1" >
    <span className="dd-summary-total-width"><ValueSpan value={props.value}/>%</span>
  </div>
);