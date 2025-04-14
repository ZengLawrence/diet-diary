import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { back } from "../../features/history/historySlice";
import { VariantSecondary } from "../ButtonVariant";

const BackButton = () => {

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(back())
  }

  return (
    <Button
      variant={VariantSecondary}
      onClick={handleClick}>
      <FontAwesomeIcon icon={faCaretLeft} />
    </Button>
  );
}

export default BackButton;