import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { VariantPrimary } from "../ButtonVariant";

interface OwnProps { 
  mealIndex: number;
  onClick: () => void;
}

export const NewFoodButton = (props: OwnProps) => (
  <Button variant={VariantPrimary}  data-cy="buttonNewFood" onClick={props.onClick}>
    <FontAwesomeIcon icon={faPlus} />
  </Button>
)