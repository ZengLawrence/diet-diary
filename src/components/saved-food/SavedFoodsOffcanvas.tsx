import { useEffect, useReducer } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { savedFoods } from "../../features/day-page/api";
import type { Food } from "../../model/Food";
import { FoodItem } from "../FoodItem";

interface State {
  foods: Food[];
}

type SetFoodsAction = { type: 'set-foods', foods: Food[] };

function reducer(state: State, action: SetFoodsAction) {
  switch (action.type) {
    case 'set-foods':
      return { foods: action.foods };
    default:
      return state;
  }
}

interface Props {
  show: boolean,
  onHide: () => void,
}

function SavedFoodsOffcanvas(props: Props) {
  const [{ foods }, dispatch] = useReducer(reducer, { foods: [] });

  useEffect(() => {
    const loadedFoods = new Promise<Food[]>((resolve) => resolve(savedFoods.getAll()));
    void loadedFoods.then((foods) => dispatch({ type: 'set-foods', foods }));
  }, [props.show]);

  /* eslint-disable react-x/no-array-index-key */
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
        <div className="mb-2 d-flex flex-row-reverse">
          <Button>Select</Button>
        </div>
        <ListGroup>
          {foods.map((food, index) => (
            <ListGroup.Item key={index}>
              <FoodItem food={food} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
  /* eslint-enable react-x/no-array-index-key */
}

export default SavedFoodsOffcanvas;