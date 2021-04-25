import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import { Meal, Serving } from "../model/Food";
import { FoodGroupServingBadge } from "./FoodGroupServingBadge";
import { FoodItem } from "./FoodItem";

function add(n1: number | undefined, n2: number | undefined) {
  return _.defaultTo(n1, 0) + _.defaultTo(n2, 0);
}

function sumServings(s1: Serving, s2: Serving): Serving {
  return {
    vegetable: add(s1.vegetable, s2.vegetable),
    fruit: add(s1.fruit, s2.fruit),
    carbohydrate: add(s1.carbohydrate, s2.carbohydrate),
    protein: add(s1.protein, s2.protein),
    fat: add(s1.fat, s2.fat),
    sweeet: add(s1.sweeet, s2.sweeet),
  };
}

const ServingSummary = (props: { servings: Serving[] }) => {
  const { servings } = props;
  const servingSummary = _.reduce(servings, sumServings, {});
  return (
    <Card.Footer className="d-flex justify-content-end" >
      <FoodGroupServingBadge foodGroup="vegetable" serving={servingSummary} />
      <FoodGroupServingBadge foodGroup="fruit" serving={servingSummary} />
      <FoodGroupServingBadge foodGroup="carbohydrate" serving={servingSummary} />
      <FoodGroupServingBadge foodGroup="protein" serving={servingSummary} />
      <FoodGroupServingBadge foodGroup="fat" serving={servingSummary} />
      <FoodGroupServingBadge foodGroup="sweeet" serving={servingSummary} />
    </Card.Footer>
  );
}

export const MealCard = (props: { meal: Meal }) => {
  const { mealTime, foods } = props.meal;
  const foodItems = foods.map((food, index) => <FoodItem key={index} food={food} />);
  const servings = _.map(foods, "serving");
  return (
    <Card className="mt-1">
      <Card.Header>{mealTime}</Card.Header>
      <ListGroup>
        {foodItems}
      </ListGroup>
      <ServingSummary servings={servings} />
    </Card>
  );
}