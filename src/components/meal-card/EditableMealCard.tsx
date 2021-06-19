import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import AddFoodInputForm from "../../features/input-form/AddFoodInputForm";
import UpdateFoodInputForm from "../../features/input-form/UpdateFoodInputForm";
import EditFoodButton from "../../features/meal-card/EditFoodButton";
import NewFoodButton from "../../features/meal-card/NewFoodButton";
import { MealState } from "../../model/MealState";
import { Meal } from "../../model/Food";
import { FoodItem } from "./FoodItem";
import { AddMealCardHeader, DefaultMealCardHeader, EditMealCardHeader } from "./MealCardHeader";

const DefaultMealCard = (props: { meal: Meal; mealIndex: number; }) => {
  const { foods } = props.meal;

  return (
    <Card className="mt-1">
      <DefaultMealCardHeader meal={props.meal} mealIndex={props.mealIndex} />

      <ListGroup>
        {
          foods.map((food, index) => (
            <ListGroup.Item key={index}>
              <FoodItem food={food} />
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Card>
  );
};

const EditMealCard = (props: { meal: Meal; mealIndex: number; foodEditIndex?: number; }) => {
  const { foods } = props.meal;

  return (
    <Card className="mt-1">
      <EditMealCardHeader meal={props.meal} mealIndex={props.mealIndex} />

      <ListGroup>
        {
          foods.map((food, index) => (
            <ListGroup.Item key={index}>
              {index === props.foodEditIndex
                ? <UpdateFoodInputForm food={food} mealIndex={props.mealIndex} foodIndex={index} />
                : <div className="d-flex align-items-center">
                  <FoodItem food={food} />
                  <EditFoodButton mealIndex={props.mealIndex} foodIndex={index} />
                </div>
              }
            </ListGroup.Item>
          ))
        }
        <ListGroup.Item>
          <NewFoodButton mealIndex={props.mealIndex} />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

const AddMealCard = (props: { meal: Meal; mealIndex: number; }) => {
  const { foods } = props.meal;

  return (
    <Card className="mt-1">
      <AddMealCardHeader meal={props.meal} mealIndex={props.mealIndex} />

      <ListGroup>
        {
          foods.map((food, index) => (
            <ListGroup.Item key={index}>
              <FoodItem food={food} />
            </ListGroup.Item>
          ))
        }
        <ListGroup.Item key={_.size(foods)}>
          <AddFoodInputForm mealIndex={props.mealIndex} />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export const EditableMealCard = (props: { state: MealState; mealIndex: number; }) => {
  const { state, mealIndex } = props;
  const { meal, editState, foodEditIndex } = state;

  switch (editState) {
    case "add":
      return <AddMealCard meal={meal} mealIndex={mealIndex} />
    case "edit":
      return <EditMealCard meal={meal} mealIndex={mealIndex} foodEditIndex={foodEditIndex} />
    default:
      return <DefaultMealCard meal={meal} mealIndex={mealIndex} />
  }
};
