import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import { MealEditState } from "../../features/day-page/mealStatesSlice";
import AddFoodInputForm from "../../features/input-form/AddFoodInputForm";
import UpdateFoodInputForm from "../../features/input-form/UpdateFoodInputForm";
import EditFoodButton from "../../features/meal-card/EditFoodButton";
import NewFoodButton from "../../features/meal-card/NewFoodButton";
import NameFoodDescriptionForm from "../../features/name-food/NameFoodDescriptionForm";
import { Food } from "../../model/Food";
import { VariantPrimary } from "../ButtonVariant";
import { FoodItem } from "../FoodItem";

interface Props {
  editState?: MealEditState;
  mealIndex: number;
  foods: Food[];
  foodEditIndex?: number;
}

export const FoodListGroupItems = (props: Props) => {
  switch (props.editState) {
    case "add":
      return (
        <Fragment>
          {props.foods.map((food, index) => (
            <ListGroup.Item key={index}>
              <FoodItem food={food} />
            </ListGroup.Item>
          ))}
          <ListGroup.Item key={_.size(props.foods)}>
            <AddFoodInputForm mealIndex={props.mealIndex} />
          </ListGroup.Item>
        </Fragment>
      );

    case "edit":
      return (
        <Fragment>
          {
            props.foods.map((food, index) => (
              <ListGroup.Item key={index} data-cy="foodItem">
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
        </Fragment>
      );

    case "name":
      return (
        <Fragment>
          <ListGroup.Item >
            <NameFoodDescriptionForm mealIndex={props.mealIndex} />
          </ListGroup.Item>
        </Fragment>
      );

    default:
      return (
        <Fragment>
          {props.foods.map((food, index) => (
            <ListGroup.Item key={index} data-cy="foodItem">
              <FoodItem food={food} />
            </ListGroup.Item>
          ))}
        </Fragment>
      );
  }
}
