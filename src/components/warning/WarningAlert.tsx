import { Alert } from "react-bootstrap";

interface Props {
  show: boolean;
  closeAlert: () => void;
  critical: boolean;
  dismissible: boolean;
}

function variant(critical : boolean) {
  return critical ? "danger" : "warning";
}

export const WarningAlert = (props: Props) => (
  <Alert 
    variant={variant(props.critical)} 
    show={props.show}
    onClose={props.closeAlert}
    dismissible={props.dismissible}>
    Total calories exceed target by <span className="fw-bold">{props.critical ? "10%" : "5%"}</span>.
  </Alert>
)