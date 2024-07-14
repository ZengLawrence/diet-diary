import { Button } from "react-bootstrap";

interface OwnProps { 
  mealIndex: number;
  foodIndex: number;
  label?: string;
  variant?: string;
  onClick?: () => void;
}

export const FoodButton = (props: OwnProps) => (
  <Button variant={props.variant} onClick={props.onClick}>{props.label}</Button>
)