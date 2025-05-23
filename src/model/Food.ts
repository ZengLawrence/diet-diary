import _ from "lodash";

export interface Serving {
  vegetable?: number;
  fruit?: number;
  carbohydrate?: number;
  proteinDiary?: number;
  fat?: number;
  sweet?: number;
}

export interface Food {
  description: string;
  serving: Serving;
  bestChoice?: boolean;
}

export interface Meal {
  mealTime: string;
  foods: Food[];
}

export type FoodGroup = "vegetable" | "fruit" | "carbohydrate" | "proteinDiary" | "fat" | "sweet";

export function newFood(): Food {
  return {
    description: "",
    serving: {},
    bestChoice: false,
  }
}

function currentTime() {
  return new Date().toLocaleTimeString([],
    {
      hour: '2-digit',
      minute: '2-digit'
    }
  );
}

export function newMeal(): Meal {
  return {
    mealTime: currentTime(),
    foods: [],
  }
}

const FOOD_GROUP_ABBREVIATIONS = {
  "vegetable": "V",
  "fruit": "F",
  "carbohydrate": "C",
  "proteinDiary": "PD",
  "fat": "Ft",
  "sweet": "S",
}

export function abbreviation(foodGroup: FoodGroup) {
  return _.get(FOOD_GROUP_ABBREVIATIONS, foodGroup);
}

const FOOD_GROUP_DISPLAY_NAMES = {
  "vegetable": "Vegetable",
  "fruit": "Fruit",
  "carbohydrate": "Carbohydrate",
  "proteinDiary": "Protein/Diary",
  "fat": "Fat",
  "sweet": "Sweet",
}

export function displayName(foodGroup: FoodGroup) {
  return _.get(FOOD_GROUP_DISPLAY_NAMES, foodGroup);
}

export function hasMoreThanOneFoodGroup(serving: Serving) {
  return _.size(_.filter(_.values(serving), v => _.defaultTo(v, 0) > 0)) > 1;
}