import { faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { VariantSecondary } from "../ButtonVariant";

const EndPositionButton = () => {
  return (
    <Button
      variant={VariantSecondary}>
      <FontAwesomeIcon icon={faForwardStep} />
    </Button>
  );
}

export default EndPositionButton;