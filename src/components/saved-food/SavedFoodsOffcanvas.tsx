import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { savedFoods } from "../../features/day-page/api";
import type { Food } from "../../model/Food";
import { FoodItem } from "../FoodItem";

interface Props {
  show: boolean,
  onHide: () => void,
}

function SavedFoodsOffcanvas(props: Props) {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const loadedFoods = new Promise<Food[]>((resolve) => resolve(savedFoods.getAll()));
    void loadedFoods.then((foods) => setFoods(foods));
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