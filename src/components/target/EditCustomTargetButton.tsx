import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import EditCustomTargetsOffcanvas from "../../features/target/EditCustomTargetsOffcanvas";

const EditCustomTargetButton = () => {
  const [showEditCustomTargets, setShowEditCustomTargets] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setShowEditCustomTargets(true)}>Custom</Button>

      <EditCustomTargetsOffcanvas
        show={showEditCustomTargets}
        onHide={() => setShowEditCustomTargets(false)}
      />
    </Fragment>
  );
};

export default EditCustomTargetButton;