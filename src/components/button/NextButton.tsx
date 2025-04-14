import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { VariantSecondary } from "../ButtonVariant";

const NextButton = () => (
  <Button variant={VariantSecondary}><FontAwesomeIcon icon={faCaretRight} /></Button>
);

export default NextButton;