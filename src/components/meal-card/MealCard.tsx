import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import AddFoodInputForm from "../../features/input-form/AddFoodInputForm";
import NewFoodButton from "../../features/meal-card/NewFoodButton";
import { MealState } from "../../model/AppState";
import { calcMealCalories } from "../../model/calorieFunction";
import { calcServingSummary } from "../../model/servingFunction";
import { FoodGroupItems } from "./FoodGroupItems";
import { MealCardHeader } from "./MealCardHeader";

interface Props {
  state: MealState;
  mealIndex: number;
  editMode: boolean;
}

export const MealCard = (props: Props) => {
  const { state, mealIndex, editMode } = props;
  const { meal, editState, foodEditIndex } = state;
  const { mealTime, foods } = meal;

  return (
    <Card className="mt-1">
      <MealCardHeader 
        mealTime={mealTime} 
        calories={calcMealCalories(meal)} 
        serving={calcServingSummary(meal)} 
        editState={editState} 
        mealIndex={mealIndex} 
        editMode={editMode} />

      <ListGroup>
        <FoodGroupItems foods={foods} mealIndex={mealIndex} foodEditIndex={foodEditIndex} editState={editState} />
        {editState === 'edit' &&
          <ListGroup.Item>
            <NewFoodButton mealIndex={mealIndex} />
          </ListGroup.Item>
        }
        {editState === 'add' &&
          <ListGroup.Item key={_.size(foods)}>
            <AddFoodInputForm mealIndex={mealIndex} />
          </ListGroup.Item>
        }
      </ListGroup>
    </Card >
  );
}