import { FoodGroup } from "./Food";

const TARGET_1200_CALORIE: Target = {
  calorie: 1200,
  serving: {
    vegetable: 4,
    fruit: 3,
    carbohydrate: 4,
    protein: 3,
    fat: 3,
    sweet: 1,
  }
}

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

const TARGET_1600_CALORIE: Target = {
  calorie: 1600,
  serving: {
    vegetable: 5,
    fruit: 5,
    carbohydrate: 6,
    protein: 5,
    fat: 3,
    sweet: 1,
  }
}

const TARGET_1800_CALORIE: Target = {
  calorie: 1800,
  serving: {
    vegetable: 5,
    fruit: 5,
    carbohydrate: 7,
    protein: 6,
    fat: 4,
    sweet: 1,
  }
}

const TARGET_2000_CALORIE: Target = {
  calorie: 2000,
  serving: {
    vegetable: 5,
    fruit: 5,
    carbohydrate: 8,
    protein: 7,
    fat: 5,
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

export function allTargets() {
  return [
    TARGET_1200_CALORIE,
    TARGET_1400_CALORIE,
    TARGET_1600_CALORIE,
    TARGET_1800_CALORIE,
    TARGET_2000_CALORIE,
  ];
}