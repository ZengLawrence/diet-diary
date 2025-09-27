import { Offcanvas } from "react-bootstrap";

export const FoodDescriptionOffcanvas = (props: { show: boolean; onHide: () => void; }) => {
  return (
    <Offcanvas show={props.show} onHide={props.onHide} placement="bottom">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Food Description</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        This is a placeholder for food description input on small screens.
      </Offcanvas.Body>
    </Offcanvas>
  );
}
