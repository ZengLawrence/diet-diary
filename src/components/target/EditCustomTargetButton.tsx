import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import { VariantSecondary } from "../ButtonVariant";
import EditCustomTargetsOffcanvas from "./EditCustomTargetsOffcanvas";

const EditCustomTargetButton = () => {
  const [showEditCustomTargets, setShowEditCustomTargets] = useState(false);

  const handleClick = () => setShowEditCustomTargets(true);
  const handleHide = () => setShowEditCustomTargets(false);

  return (
    <Fragment>
      <Button
        variant={VariantSecondary}
        onClick={handleClick}>
        Custom
      </Button>

      <EditCustomTargetsOffcanvas
        show={showEditCustomTargets}
        onHide={handleHide}
      />
    </Fragment>
  );
};

export default EditCustomTargetButton;