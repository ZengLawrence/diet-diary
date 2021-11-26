import { Card, ListGroup } from "react-bootstrap";
import { MealState } from "../../features/day-page/mealStatesSlice";
import FoodListGroupItems from "../../features/meal-card/FoodListGroupItems";
import MealCardHeader from "../../features/meal-card/MealCardHeader";

const DefaultMealCard = (props: { mealIndex: number; }) => {
  return (
    <Card className="mt-1">
      <MealCardHeader mealIndex={props.mealIndex} />

      <ListGroup>
        <FoodListGroupItems mealIndex={props.mealIndex} />
      </ListGroup>
    </Card>
  );
};

const EditMealCard = (props: { mealIndex: number; }) => {
  return (
    <Card className="mt-1">
      <MealCardHeader mealIndex={props.mealIndex} />

      <ListGroup>
        <FoodListGroupItems mealIndex={props.mealIndex} />
      </ListGroup>
    </Card>
  );
};

const AddMealCard = (props: { mealIndex: number; }) => {
  return (
    <Card className="mt-1">
      <MealCardHeader mealIndex={props.mealIndex} />

      <ListGroup>
        <FoodListGroupItems mealIndex={props.mealIndex} />
      </ListGroup>
    </Card>
  );
};

const NameMealCard = (props: { mealIndex: number; }) => {

  return (
    <Card className="mt-1">
      <MealCardHeader mealIndex={props.mealIndex} />

      <ListGroup>
        <FoodListGroupItems mealIndex={props.mealIndex} />
      </ListGroup>
    </Card>
  );
};

export const EditableMealCard = (props: { state: MealState; mealIndex: number; }) => {
  const { state, mealIndex } = props;
  const { editState } = state;

  switch (editState) {
    case "add":
      return <AddMealCard mealIndex={mealIndex} />
    case "edit":
      return <EditMealCard mealIndex={mealIndex} />
    case "name":
      return <NameMealCard mealIndex={mealIndex} />
    default:
      return <DefaultMealCard mealIndex={mealIndex} />
  }
};
