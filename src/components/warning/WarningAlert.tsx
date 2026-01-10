import _ from "lodash";
import { Alert } from "react-bootstrap";
import { ExclamationTriangleFill, SignStopFill } from "react-bootstrap-icons";

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
  const icon = props.critical ? <SignStopFill size={24} /> : <ExclamationTriangleFill size={24} />;

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
