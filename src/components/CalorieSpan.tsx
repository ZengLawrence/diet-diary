import { toIntString } from "./toIntString";

export const CalorieSpan = (props: { value: number; }) => <span>{toIntString(props.value)}{' '}Cal.</span>;
