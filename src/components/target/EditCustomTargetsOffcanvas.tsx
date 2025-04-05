import Offcanvas from "react-bootstrap/Offcanvas";

interface Props {
  show: boolean,
  onHide: () => void,
}

const EditCustomTargetsOffcanvas = (props: Props) => (
  <Offcanvas id="savedMeals" show={props.show} onHide={props.onHide}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Custom Targets</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      Offcanvas body.
    </Offcanvas.Body>
  </Offcanvas>
);

export default EditCustomTargetsOffcanvas;