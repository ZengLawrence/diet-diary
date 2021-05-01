import _ from "lodash";

export interface Serving {
  vegetable?: number;
  fruit?: number;
  carbohydrate?: number;
  protein?: number;
  fat?: number;
  sweet?: number;
}

export interface Food {
  name: string;
  serving: Serving;
}

export interface Meal {
  mealTime: string;
  foods: Food[];
}

export type FoodGroup = "vegetable" | "fruit" | "carbohydrate" | "protein" | "fat" | "sweet";

const FOOD_GROUP_CALORIES = {
  "vegetable": 25,
  "fruit": 60,
  "carbohydrate": 70,
  "protein": 110,
  "fat": 45,
  "sweet": 75,
};

export function getCalories(foodGroup: FoodGroup) {
  return _.get(FOOD_GROUP_CALORIES, foodGroup, 0);
}

export function calcFoodCalories(food: Food) {
  const serving = food.serving;
  const calcCalories = (foodGroup: FoodGroup) => getCalories(foodGroup) * _.get(serving, foodGroup, 0);
  return _.sum(_.map(_.keys(serving), calcCalories));
}
