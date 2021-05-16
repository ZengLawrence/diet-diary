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

export function newFood(): Food {
  return {
    name: "",
    serving: {}
  }
}

function currentTime() {
  return new Date().toLocaleTimeString();
}

export function newMeal(): Meal {
  return {
    mealTime: currentTime(),
    foods: [],
  }
}