import _ from "lodash";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Food } from "../../model/Food";
import { SavedMealCards } from "./SavedMealCards";

interface Props {
  show: boolean,
  meals: { index: number; foods: Food[]; }[],
  onHide: () => void,
}

const SearchTermInput = () => (
  <Form>
    <Form.Control type="text" placeholder="Type to search" />
  </Form>
)

function SavedMealCardsOffcanvas(props: Props) {
  return (
    <Offcanvas id="savedMeals" show={props.show} onHide={props.onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saved Meals</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SearchTermInput />
        <div>Total: {_.size(props.meals)}</div>
        <SavedMealCards meals={props.meals} />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SavedMealCardsOffcanvas;