import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Action, newDayAction } from "../actions";
import { MealDispatch } from "./MealDispatch";

export const NewDayButton = () => {
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  return (
    <Button
      variant="outline-danger"
      onClick={() => dispatch(newDayAction())}
    >
      New Day
    </Button>
  );
};
