import { faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { atEnd } from "../../features/history/historySlice";
import { VariantSecondary } from "../ButtonVariant";

const EndPositionButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(atEnd())
  }

  return (
    <Button
      variant={VariantSecondary}
      onClick={handleClick}>
      <FontAwesomeIcon icon={faForwardStep} />
    </Button>
  );
}

export default EndPositionButton;