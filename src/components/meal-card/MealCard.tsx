import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import AddFoodInputForm from "../../features/input-form/AddFoodInputForm";
import NewFoodButton from "../../features/meal-card/NewFoodButton";
import { MealState } from "../../model/AppState";
import { calcMealCalories, displayCalorieValue } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { calcServingSummary } from "../../model/servingFunction";
import { FoodGroupServingBadgePanel } from "../badge/FoodGroupServingBadgePanel";
import { FoodGroupItems } from "./FoodGroupItems";
import { FoodItem } from "./FoodItem";
import { MealCardHeader } from "./MealCardHeader";

interface Props {
  state: MealState;
  mealIndex: number;
  editMode: boolean;
}

const UneditableMealCard = (props: { meal: Meal }) => {
  const { meal } = props;
  const { mealTime, foods } = meal;

  return (
    <Card className="mt-1">
      <Card.Header className="d-flex flex-wrap align-items-center">
        <div className="flex-fill">{mealTime}</div>
        <div className="d-flex justify-content-between align-items-center flex-grow-1 flex-md-grow-0">
          <div className="mr-1">{displayCalorieValue(calcMealCalories(meal))}{' '}Cal.</div>
          <FoodGroupServingBadgePanel serving={calcServingSummary(meal)} />
        </div>
      </Card.Header>

      <ListGroup>
        {
          foods.map((food, index) =>
            <ListGroup.Item key={index}>
              <FoodItem food={food} />
            </ListGroup.Item>
          )
        }
      </ListGroup>
    </Card >
  );
}

const EditableMealCard = (props: Props) => {
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

export const MealCard = (props: Props) => (
  props.editMode ? <EditableMealCard state={props.state} mealIndex={props.mealIndex} editMode={props.editMode} /> : <UneditableMealCard meal={props.state.meal}/>
)