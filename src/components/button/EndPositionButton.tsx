import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { atEnd } from "../../features/history/historySlice";
import { VariantSecondary } from "../ButtonVariant";

const GoToTodayButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(atEnd())
  }

  return (
    <Button
      variant={VariantSecondary}
      onClick={handleClick}>
      Today
    </Button>
  );
}

export default GoToTodayButton;