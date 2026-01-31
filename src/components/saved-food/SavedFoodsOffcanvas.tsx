import Offcanvas from "react-bootstrap/Offcanvas";

interface Props {
  show: boolean,
  onHide: () => void,
}

function SavedFoodsOffcanvas(props: Props) {
  return (
    <Offcanvas
      show={props.show}
      onHide={props.onHide}
      id="savedFoods"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saved Foods</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Saved foods content goes here.
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SavedFoodsOffcanvas;