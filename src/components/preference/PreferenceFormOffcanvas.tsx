import Offcanvas from "react-bootstrap/Offcanvas";
import PreferenceForm from "./PreferenceForm";

interface Props {
  show: boolean;
  onHide: () => void;
}

const PreferenceFormOffcanvas = (props: Props) => {
  return (
    <Offcanvas id="preferences" show={props.show}>
      <Offcanvas.Header closeButton onHide={props.onHide}>
        <Offcanvas.Title>Preferences</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <PreferenceForm />
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default PreferenceFormOffcanvas;