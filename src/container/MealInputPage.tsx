import { Fragment, useReducer } from "react";
import { FoodInputForm } from "../components/FoodInputForm";
import { MealCard } from "../components/MealCard";
import { Food, Meal } from "../model/Food";

function reducer(state: Meal, action: {type: string; food: Food}) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        foods: [...state.foods, action.food],
      };
    default:
      throw new Error();
  }
}

export const MealInputPage = (props: { meal: Meal }) => {
  const [meal, dispatch] = useReducer(reducer, props.meal);

  return (
    <Fragment>
      <MealCard meal={meal} />
      <FoodInputForm onAddFood={food => dispatch({type: 'add', food})}/>
    </Fragment>
  );
}