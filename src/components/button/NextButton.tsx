import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { next } from "../../features/day-page/pageOptionsSlice";
import { VariantSecondary } from "../ButtonVariant";

const NextButton = () => {
  const dispatch = useDispatch<AppDispatch>();
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