import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { VariantSecondary } from "../ButtonVariant";

const StartPositionButton = () => (
  <Button variant={VariantSecondary}><FontAwesomeIcon icon={faBackwardStep} /></Button>
);

export default StartPositionButton;