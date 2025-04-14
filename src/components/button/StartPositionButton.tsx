import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { atStart } from "../../features/history/historySlice";
import { VariantSecondary } from "../ButtonVariant";

const StartPositionButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(atStart())
  }

  return (
    <Button
      variant={VariantSecondary}
      onClick={handleClick}>
      <FontAwesomeIcon icon={faBackwardStep} />
    </Button>
  );
}

export default StartPositionButton;