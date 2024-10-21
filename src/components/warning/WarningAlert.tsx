import { Alert } from "react-bootstrap";

interface Props {
  show?: boolean;
  critical?: boolean;
}

function variant() {
  return "warning";
}

export const WarningAlert = (props: Props) => (
  <Alert 
    variant={variant()} 
    show={props.show}
    dismissible>
    Total calories exceed target by <span className="fw-bold">5%</span>.
  </Alert>
)