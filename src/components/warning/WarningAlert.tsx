import { Alert } from "react-bootstrap";

interface Props {
  show?: boolean;
  critical?: boolean;
}

function variant() {
  return "warning";
}

function alertText() {
  return "Total calories exceed target by 5%.";
}
export const WarningAlert = (props: Props) => (
  <Alert 
    variant={variant()} 
    show={props.show}
    dismissible>
    {alertText()}
  </Alert>
)