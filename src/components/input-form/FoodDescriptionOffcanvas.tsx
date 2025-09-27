import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";

interface Props {
  show: boolean;
  onHide: () => void;
  foodName: string;
  invalid?: boolean;
  foodNameChanged: (name: string) => void;
}

export const FoodDescriptionOffcanvas = (props: Props) => {
  return (
    <Offcanvas show={props.show} onHide={props.onHide} placement="bottom">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Food Description</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Control
            id="inputFoodDescription"
            type="text"
            placeholder="Broccoli steamed 1 cup"
            value={props.foodName}
            onChange={(e) => props.foodNameChanged(e.target.value)}
            required
            isInvalid={props.invalid}
            autoFocus
          />
        </Form>

      </Offcanvas.Body>
    </Offcanvas>
  );
}
