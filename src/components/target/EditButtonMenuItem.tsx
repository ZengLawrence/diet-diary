import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import EditCustomTargetsOffcanvas from "../../features/target/EditCustomTargetsOffcanvas";

const EditButtonMenuItem = () => {
  const [showEditCustomTargets, setShowEditCustomTargets] = useState(false);

  return (
    <Fragment>
      <Dropdown.Item className="d-flex flex-row-reverse">
        <Button onClick={() => setShowEditCustomTargets(true)}>Edit</Button>
      </Dropdown.Item>

      <EditCustomTargetsOffcanvas
        show={showEditCustomTargets}
        onHide={() => setShowEditCustomTargets(false)}
      />
    </Fragment>
  );
};

export default EditButtonMenuItem;