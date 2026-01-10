import { Button } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { VariantPrimary } from "../ButtonVariant";

interface Props { 
  mealIndex: number;
  onClick: () => void;
}

export const NewFoodButton = (props: Props) => (
  <Button variant={VariantPrimary}  data-cy="buttonNewFood" onClick={props.onClick}>
    <PlusLg />
  </Button>
)