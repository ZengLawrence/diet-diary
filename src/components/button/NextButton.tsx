import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../../app/hooks";
import { next } from "../../features/day-page/pageOptionsSlice";
import { VariantSecondary } from "../ButtonVariant";

const NextButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(next());
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