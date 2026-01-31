import { useEffect, useState } from "react";
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
    const loadedFoods = savedFoods.getAll();
    setFoods(loadedFoods);
  }, [props.show]);

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
        {foods.map((food, index) => (
          <FoodItem food={food} key={index} />
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SavedFoodsOffcanvas;