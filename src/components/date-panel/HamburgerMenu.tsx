import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { VariantSecondary } from "../ButtonVariant";

const HamburgerMenu = () => (
  <Button variant={VariantSecondary}>
    <FontAwesomeIcon icon={faBars} />
  </Button>
);

export default HamburgerMenu;