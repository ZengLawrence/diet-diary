import { Button } from "react-bootstrap";

interface OwnProps { 
  mealIndex: number;
  label: string;
  variant?: string;
  onClick: () => void;
}

export const MealButton = (props: OwnProps) => (
  <Button variant={props.variant} onClick={props.onClick}>{props.label}</Button>
)