import { Card, ListGroup } from "react-bootstrap";

interface Serving {
  vegetable?: number;
  fruit?: number;
  carbohydrate?: number;
  protein?: number;
  fat?: number;
  sweeet?: number;
}

interface Food {
  name: string;
  serving: Serving;
}

interface Props {
  mealTime: string;
  food: Food;
}

function FoodItem(props: {food: Food}) {
  const {name, serving} = props.food;
  return (
    <ListGroup.Item className="d-flex">
      <div>{name}</div>
      <div className="text-white m-1" style={{backgroundColor: "green"}}>{serving.vegetable}</div>
      <div className="text-white m-1" style={{backgroundColor: "teal"}}>{serving.fruit}</div>
      <div className="text-white m-1" style={{backgroundColor: "cyan"}}>{serving.carbohydrate}</div>
      <div className="text-white m-1" style={{backgroundColor: "blue"}}>{serving.protein}</div>
      <div className="text-white m-1" style={{backgroundColor: "orange"}}>{serving.fat}</div>
      <div className="text-white m-1" style={{backgroundColor: "red"}}>{serving.sweeet}</div>
    </ListGroup.Item>
  );
}

export const MealCard = (props: Props) => {
  const { mealTime, food } = props;
  return (
    <Card>
      <Card.Body>
        <Card.Title>{mealTime}</Card.Title>
      </Card.Body>
      <ListGroup>
        <FoodItem food={food} />
      </ListGroup>
    </Card>
  );
}