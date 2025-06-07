import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { goToToday } from "../../features/day-page/pageOptionsSlice";
import { VariantSecondary } from "../ButtonVariant";

const GoToTodayButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(goToToday());
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