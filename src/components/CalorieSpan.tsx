import { toIntString } from "./stringUtil";

export const CalorieSpan = (props: { value: number; }) => <span>{toIntString(props.value)}{' '}Cal.</span>;
