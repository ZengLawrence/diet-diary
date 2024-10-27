import { toIntString } from "../../model/calorieFunction";

export const Percentage = (props: { value: number; }) => (
  <div className="d-flex flex-column justify-content-center border rounded bg-info text-white text-center p-1" style={{ width: '110px' }}>
    <span><span style={{ fontSize: '40px' }}>{toIntString(props.value)}</span>%</span>
  </div>
);