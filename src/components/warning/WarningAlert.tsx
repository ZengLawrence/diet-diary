import { faBan, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap";

interface Props extends React.PropsWithChildren {
  show: boolean;
  closeAlert: () => void;
  critical: boolean;
  dismissible: boolean;
}

function variant(critical: boolean) {
  return critical ? "danger" : "warning";
}

export const WarningAlert = (props: Props) => {
  const icon = props.critical ? <FontAwesomeIcon icon={faBan}  size="xl" /> : <FontAwesomeIcon icon={faTriangleExclamation} size="xl" />;

  return (
    <Alert
      variant={variant(props.critical)}
      show={props.show}
      onClose={props.closeAlert}
      dismissible={props.dismissible}>
      {icon}{props.children}
    </Alert>
  );
}