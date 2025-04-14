import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { VariantSecondary } from "../ButtonVariant";

const BackButton = () => (
  <Button variant={VariantSecondary}><FontAwesomeIcon icon={faCaretLeft} /></Button>
);

export default BackButton;