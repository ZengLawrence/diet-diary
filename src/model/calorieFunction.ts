import _ from "lodash";
import { FoodGroup, Serving, Food, Meal } from "./Food";

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
function calcServingCalories(serving: Serving) {
  const calcCalories = (foodGroup: FoodGroup) => getCalories(foodGroup) * _.get(serving, foodGroup, 0);
  return _.sum(_.map(_.keys(serving), calcCalories));
}

export function calcFoodCalories(food: Food) {
  return calcServingCalories(food.serving);
}

export function calcMealCalories(meal: Meal) {
  return _.sum(_.map(meal.foods, calcFoodCalories));
}
