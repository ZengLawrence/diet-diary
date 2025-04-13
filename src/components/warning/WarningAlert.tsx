import { faBan, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { Alert } from "react-bootstrap";

interface Props extends React.PropsWithChildren {
  show: boolean;
  closeAlert?: () => void;
  critical?: boolean;
  dismissible?: boolean;
}

function variant(critical: boolean) {
  return critical ? "danger" : "warning";
}

export const WarningAlert = (props: Props) => {
  const icon = props.critical ? <FontAwesomeIcon icon={faBan}  size="xl" /> : <FontAwesomeIcon icon={faTriangleExclamation} size="xl" />;

  return (
    <Alert
      variant={variant(_.defaultTo(props.critical, false))}
      show={props.show}
      onClose={props.closeAlert}
      dismissible={_.defaultTo(props.dismissible, true)}>
      {icon}{props.children}
    </Alert>
  );
}
