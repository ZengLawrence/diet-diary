import { toIntString } from "../model/calorieFunction";

export const CalorieSpan = (props: { value: number; }) => <span>{toIntString(props.value)}{' '}Cal.</span>;
