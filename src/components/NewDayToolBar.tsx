import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Action, newDayAction } from "../actions";
import { MealDispatch } from "./MealDispatch";

export const NewDayToolBar = () => {
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  return (
    <Button
      variant="outline-danger"
      className="w-100"
      onClick={() => dispatch(newDayAction())}
    >
      New Day
    </Button>
  );
};
