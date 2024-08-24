import Offcanvas from "react-bootstrap/Offcanvas";
import SavedMealCards from "../../features/save-meal/SavedMealCards";

interface Props {
  show: boolean,
  onHide: () => void,
}

function SavedMealCardsOffcanvas(props: Props) {
  return (
    <Offcanvas show={props.show} onHide={props.onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saved Meals</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SavedMealCards selectMeal={props.onHide} />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SavedMealCardsOffcanvas;