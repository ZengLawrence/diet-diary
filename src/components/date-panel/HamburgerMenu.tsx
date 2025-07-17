import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown } from "react-bootstrap";
import { VariantSecondary } from "../ButtonVariant";

const HamburgerMenu = () => (
  <Dropdown>
    <Dropdown.Toggle variant={VariantSecondary}>
      <FontAwesomeIcon icon={faBars} />
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item>Preferences</Dropdown.Item>
      <Dropdown.Item>Custom targets</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default HamburgerMenu;