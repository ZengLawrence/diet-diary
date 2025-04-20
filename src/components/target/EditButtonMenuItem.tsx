import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import EditCustomTargetsOffcanvas from "../../features/target/EditCustomTargetsOffcanvas";

const EditButtonMenuItem = () => {
  const [showEditCustomTargets, setShowEditCustomTargets] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setShowEditCustomTargets(true)}>Edit</Button>

      <EditCustomTargetsOffcanvas
        show={showEditCustomTargets}
        onHide={() => setShowEditCustomTargets(false)}
      />
    </Fragment>
  );
};

export default EditButtonMenuItem;