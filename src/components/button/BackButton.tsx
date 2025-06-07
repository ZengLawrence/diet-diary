import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { VariantSecondary } from "../ButtonVariant";
import { back } from "../../features/day-page/pageOptionsSlice";
import { AppDispatch } from "../../app/store";

const BackButton = () => {

  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(back());
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