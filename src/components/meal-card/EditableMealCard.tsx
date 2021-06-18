import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import AddFoodInputForm from "../../features/input-form/AddFoodInputForm";
import NewFoodButton from "../../features/meal-card/NewFoodButton";
import { MealState } from "../../model/AppState";
import { FoodGroupItems } from "./FoodGroupItems";
import { MealCardHeader } from "./MealCardHeader";

export const EditableMealCard = (props: { state: MealState; mealIndex: number; }) => {
  const editMode = true;
  const { state, mealIndex } = props;
  const { meal, editState, foodEditIndex } = state;
  const { mealTime, foods } = meal;

  return (
    <Card className="mt-1">
      <MealCardHeader
        mealTime={mealTime}
        meal={meal}
        editState={editState}
        mealIndex={mealIndex}
        editMode={editMode} />

      <ListGroup>
        <FoodGroupItems foods={foods} mealIndex={mealIndex} foodEditIndex={foodEditIndex} editState={editState} />
        {editState === 'edit' &&
          <ListGroup.Item>
            <NewFoodButton mealIndex={mealIndex} />
          </ListGroup.Item>}
        {editState === 'add' &&
          <ListGroup.Item key={_.size(foods)}>
            <AddFoodInputForm mealIndex={mealIndex} />
          </ListGroup.Item>}
      </ListGroup>
    </Card>
  );
};
