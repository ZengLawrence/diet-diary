import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { VariantPrimary } from "../ButtonVariant";

interface Props { 
  mealIndex: number;
  onClick: () => void;
}

export const NewFoodButton = (props: Props) => (
  <Button variant={VariantPrimary}  data-cy="buttonNewFood" onClick={props.onClick}>
    <FontAwesomeIcon icon={faPlus} />
  </Button>
)