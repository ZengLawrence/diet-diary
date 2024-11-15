import _ from "lodash";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Food } from "../../model/Food";
import { SavedMealCards } from "./SavedMealCards";

interface Props {
  show: boolean,
  meals: { index: number; foods: Food[]; }[],
  onHide: () => void,
}

function SavedMealCardsOffcanvas(props: Props) {
  return (
    <Offcanvas id="savedMeals" show={props.show} onHide={props.onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saved Meals</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>Total: {_.size(props.meals)}</div>
        <SavedMealCards meals={props.meals}/>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SavedMealCardsOffcanvas;