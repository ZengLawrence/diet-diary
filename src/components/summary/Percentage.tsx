import { toIntString } from "../../model/calorieFunction";

export const Percentage = (props: { value: number; }) => (
  <div className="border rounded bg-info text-white text-center p-1">
    <span style={{ fontSize: '40px', width: '110px' }}>{toIntString(props.value)}</span>%
  </div>
);