import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import { MealState } from "../../features/day-page/mealStatesSlice";
import AddFoodInputForm from "../../features/input-form/AddFoodInputForm";
import UpdateFoodInputForm from "../../features/input-form/UpdateFoodInputForm";
import EditFoodButton from "../../features/meal-card/EditFoodButton";
import FoodListGroupItems from "../../features/meal-card/FoodListGroupItems";
import MealButtons from "../../features/meal-card/MealButtons";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import NewFoodButton from "../../features/meal-card/NewFoodButton";
import NameFoodDescriptionForm from "../../features/name-food/NameFoodDescriptionForm";
import { Meal } from "../../model/Food";
import { VariantPrimary } from "../ButtonVariant";
import { FoodItem } from "../FoodItem";

const MealCardHeader = (props: {
  meal: Meal;
  mealIndex: number;
}) => (
  <Card.Header className="d-flex flex-wrap align-items-center">
    <div className="flex-fill order-sm-0">{props.meal.mealTime}</div>
    <div className="order-sm-2">
      <MealButtons mealIndex={props.mealIndex} />
    </div>
    <div className="order-sm-1 flex-grow-1 flex-md-grow-0">
      <MealCalorieServingPanel meal={props.meal} />
    </div>
  </Card.Header>
)

const DefaultMealCard = (props: { meal: Meal; mealIndex: number; }) => {
  return (
    <Card className="mt-1">
      <MealCardHeader meal={props.meal} mealIndex={props.mealIndex} />

      <ListGroup>
        <FoodListGroupItems mealIndex={props.mealIndex} />
      </ListGroup>
    </Card>
  );
};

const EditMealCard = (props: { meal: Meal; mealIndex: number; foodEditIndex?: number; }) => {
  const { foods } = props.meal;

  return (
    <Card className="mt-1">
      <MealCardHeader meal={props.meal} mealIndex={props.mealIndex} />

      <ListGroup>
        {
          foods.map((food, index) => (
            <ListGroup.Item key={index} data-cy={"food-" + props.mealIndex + "-" + index}>
              {index === props.foodEditIndex
                ? <UpdateFoodInputForm food={food} mealIndex={props.mealIndex} foodIndex={index} />
                : <div className="d-flex align-items-center">
                  <FoodItem food={food} />
                  <EditFoodButton mealIndex={props.mealIndex} foodIndex={index}>Edit</EditFoodButton>
                </div>
              }
            </ListGroup.Item>
          ))
        }
        <ListGroup.Item>
          <NewFoodButton variant={VariantPrimary} mealIndex={props.mealIndex} data-cy={"buttonNewFood"}>
            <FontAwesomeIcon icon={faPlus} />
          </NewFoodButton>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

const AddMealCard = (props: { meal: Meal; mealIndex: number; }) => {
  const { foods } = props.meal;

  return (
    <Card className="mt-1">
      <MealCardHeader meal={props.meal} mealIndex={props.mealIndex} />

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

const NameMealCard = (props: { meal: Meal; mealIndex: number; }) => {

  return (
    <Card className="mt-1">
      <MealCardHeader meal={props.meal} mealIndex={props.mealIndex} />

      <ListGroup>
        <ListGroup.Item >
          <NameFoodDescriptionForm mealIndex={props.mealIndex} />
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
    case "name":
      return <NameMealCard meal={meal} mealIndex={mealIndex} />
    default:
      return <DefaultMealCard meal={meal} mealIndex={mealIndex} />
  }
};
