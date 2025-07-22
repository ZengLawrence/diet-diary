import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { VariantSecondary } from "../ButtonVariant";

const HamburgerMenu = () => {
  const [show, setShow] = useState(false);

  return (
    <Dropdown show={show}>
      <Button variant={VariantSecondary} onClick={() => setShow(!show)}>
        <FontAwesomeIcon icon={faBars} />
      </Button>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setShow(false)}>Preferences</Dropdown.Item>
        <Dropdown.Item onClick={() => setShow(false)}>Custom targets</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default HamburgerMenu;