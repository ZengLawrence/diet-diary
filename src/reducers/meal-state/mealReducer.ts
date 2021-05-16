import _ from "lodash";
import { Action, AddFoodAction, UpdateFoodAction } from "../../actions";
import { Meal } from "../../model/Food";

function updateFood(meal: Meal, action: UpdateFoodAction) {
  const foods = _.clone(meal.foods);
  foods[action.foodIndex] = action.food;
  return {
    ...meal,
    foods,
  };
}

export function mealReducer(state: Meal, action: Action) {
  switch (action.type) {
    case 'add-food':
      const addFoodAction = action as AddFoodAction;
      return {
        ...state,
        foods: [...state.foods, addFoodAction.food],
      };
    case "update-food":
      return updateFood(state, action as UpdateFoodAction);
    default:
      return state;
  }
}
