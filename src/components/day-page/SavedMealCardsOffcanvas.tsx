import Offcanvas from "react-bootstrap/Offcanvas";
import SavedMealCards from "../../features/saved-meal/SavedMealCards";

interface Props {
  show: boolean,
  count: number,
  onHide: () => void,
}

function SavedMealCardsOffcanvas(props: Props) {
  return (
    <Offcanvas id="savedMeals" show={props.show} onHide={props.onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saved Meals</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>Total: {props.count}</div>
        <SavedMealCards />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SavedMealCardsOffcanvas;