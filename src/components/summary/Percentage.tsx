import { toIntString } from "../../model/calorieFunction";

export const Percentage = (props: { value: number; }) => (
  <div className="border rounded bg-info text-white text-center p-1" style={{ width: '110px' }}>
    <span style={{ fontSize: '40px' }}>{toIntString(props.value)}</span>%
  </div>
);