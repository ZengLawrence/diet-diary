import { Button } from "react-bootstrap";
import { newDayAction } from "../../actions";
import { useAppDispatch } from "../../app/hooks";

export const NewDayButton = () => {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant="outline-danger"
      onClick={() => dispatch(newDayAction())}
    >
      New Day
    </Button>
  );
};
