import { displayCalorieValue } from "../model/calorieFunction";

export const CalorieSpan = (props: { value: number; }) => <span>{displayCalorieValue(props.value)}{' '}Cal.</span>;
