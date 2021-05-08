import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Action, addFoodAction, cancelAddFoodAction, deleteMealAction } from "../actions";
import { MealState } from "../model/AppState";
import { Food } from "../model/Food";
import { FoodInputForm } from "./FoodInputForm";
import { FoodItem } from "./FoodItem";
import { MealDispatch } from "./MealDispatch";
import { MealSummary } from "./MealSummary";

const FoodInputFormItem = (props: { mealIndex: number }) => {
  const { mealIndex } = props;
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handlAddFood = (food: Food) => {
    dispatch(addFoodAction(mealIndex, food));
  }

  const handleCancelAddFood = () => {
    dispatch(cancelAddFoodAction(mealIndex));
  }

  return (
    <ListGroup.Item>
      <FoodInputForm onAddFood={handlAddFood} onCancel={handleCancelAddFood} />
    </ListGroup.Item>
  );
}

interface Props {
  state: MealState;
  mealIndex: number;
  showDeleteButton: boolean;
}

const DeleteButton = (props: { mealIndex: number }) => {
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handleClick = () => dispatch(deleteMealAction(props.mealIndex));
  return (
    <FontAwesomeIcon
      icon={faMinusCircle}
      className="text-danger mr-1"
      size="2x"
      onClick={handleClick}
    />
  );
}

export const MealCard = (props: Props) => {
  const { state, mealIndex, showDeleteButton } = props;
  const { meal, editState } = state;
  const { mealTime, foods } = meal;
  const foodItems = foods.map((food, index) => <FoodItem key={index} food={food} />);

  return (
    <Card className="mt-1">
      <Card.Header className="d-flex align-items-center">
        {showDeleteButton &&
          <DeleteButton mealIndex={mealIndex} />}
        <div className="mr-auto">{mealTime}</div>
        <MealSummary meal={meal} />
      </Card.Header>
      <ListGroup>
        {foodItems}
        {editState === 'add' && <FoodInputFormItem mealIndex={mealIndex} />}
      </ListGroup>
    </Card>
  );
}