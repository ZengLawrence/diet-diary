import { FoodGroup } from "./Food";

const TARGET_1400_CALORIE: Target = {
  calorie: 1400,
  serving: {
    vegetable: 4,
    fruit: 4,
    carbohydrate: 5,
    protein: 4,
    fat: 3,
    sweet: 1,
  }
}

export const DEFAULT_TARGET = TARGET_1400_CALORIE;

export interface Target {
  calorie: number;
  serving: {
    vegetable: number;
    fruit: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    sweet: number;
  };
}

export function isMinLimit(foodGroup: FoodGroup) {
  return (foodGroup === "vegetable" || foodGroup === "fruit");
}