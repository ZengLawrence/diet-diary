import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { next } from "../../features/history/historySlice";
import { VariantSecondary } from "../ButtonVariant";

const NextButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(next())
  }

  return (
    <Button 
      variant={VariantSecondary}
      onClick={handleClick}>
      <FontAwesomeIcon icon={faCaretRight} />
    </Button>
  );
}
export default NextButton;