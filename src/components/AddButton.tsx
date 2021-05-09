import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export const AddButton = (props: { onClick: () => void; }) => (
  <Button variant="outline-primary" onClick={props.onClick}>
    <FontAwesomeIcon icon={faPlus} />
  </Button>
);
