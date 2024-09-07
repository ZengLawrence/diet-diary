import { Button } from "react-bootstrap";

interface Props {
  mealIndex: number;
  variant?: string;
  handleClick: () => void;
}

export const SaveButton = (props: Props) => {

  return (
    <Button variant={props.variant} onClick={props.handleClick}>
      Save
    </Button>
  )
}