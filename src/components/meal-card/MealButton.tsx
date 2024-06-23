import { Button, ButtonProps } from "react-bootstrap";

interface OwnPros { 
  mealIndex: number;
}

export const MealButton = (props: OwnPros & ButtonProps) => (
  <Button {...props}></Button>
)