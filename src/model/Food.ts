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

function add(n1: number | undefined, n2: number | undefined) {
  return _.defaultTo(n1, 0) + _.defaultTo(n2, 0);
}

function addServings(s1: Serving, s2: Serving): Serving {
  return {
    vegetable: add(s1.vegetable, s2.vegetable),
    fruit: add(s1.fruit, s2.fruit),
    carbohydrate: add(s1.carbohydrate, s2.carbohydrate),
    protein: add(s1.protein, s2.protein),
    fat: add(s1.fat, s2.fat),
    sweet: add(s1.sweet, s2.sweet),
  };
}

function mealServings(meal: Meal) {
  return _.map(meal.foods, 'serving');
}

export function calcServingSummary(meal: Meal) {
  return _.reduce(mealServings(meal), addServings, {});
}
