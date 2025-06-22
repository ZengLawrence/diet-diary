import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../../app/hooks";
import { back } from "../../features/day-page/pageOptionsSlice";
import { VariantSecondary } from "../ButtonVariant";

const BackButton = () => {

  const dispatch = useAppDispatch();
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