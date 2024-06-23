import { Button, ButtonProps } from "react-bootstrap";

interface OwnPros { 
  mealIndex: number;
  foodIndex: number;
}

export const FoodButton = (props: OwnPros & ButtonProps) => (
  <Button {...props}></Button>
)