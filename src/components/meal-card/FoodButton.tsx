import { Button, ButtonProps } from "react-bootstrap";

interface OwnProps { 
  mealIndex: number;
  foodIndex: number;
}

export const FoodButton = (props: OwnProps & ButtonProps) => (
  <Button {...props}></Button>
)