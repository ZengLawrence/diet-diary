import { SkipEndFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { goToToday } from "../../features/day-page/pageOptionsSlice";
import { VariantSecondary } from "../ButtonVariant";

const GoToTodayButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    void dispatch(goToToday());
  }

  return (
    <Button
      variant={VariantSecondary}
      onClick={handleClick}>
      <SkipEndFill />
    </Button>
  );
}

export default GoToTodayButton;