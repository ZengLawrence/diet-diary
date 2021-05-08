import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddButton = (props: { onClick: () => void; }) => (
  <FontAwesomeIcon
    icon={faPlus}
    size="2x"
    className="text-primary"
    onClick={props.onClick} />
);
