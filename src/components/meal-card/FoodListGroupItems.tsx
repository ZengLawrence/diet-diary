import { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import { Food } from "../../model/Food";
import { FoodItem } from "../FoodItem";

export const FoodListGroupItems = (props: { foods: Food[]; }) => (
  <Fragment>
    {props.foods.map((food, index) => (
      <ListGroup.Item key={index}>
        <FoodItem food={food} />
      </ListGroup.Item>
    ))}
  </Fragment>
);
