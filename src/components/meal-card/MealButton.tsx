import { Button, ButtonProps } from "react-bootstrap";

interface OwnProps { 
  mealIndex: number;
}

export const MealButton = (props: OwnProps & ButtonProps) => (
  <Button {...props}></Button>
)