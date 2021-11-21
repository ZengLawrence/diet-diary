import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { VariantPrimary } from "./ButtonVariant";

export const AddButton = (props: { onClick: () => void; }) => (
  <Button variant={VariantPrimary} onClick={props.onClick}>
    <FontAwesomeIcon icon={faPlus} />
  </Button>
);
