import { FoodGroup } from "./Food";

export type Gender = "man" | "woman";

const NO_TARGET: Target = {
  calorie: 0,
  serving: {
    vegetable: 0,
    fruit: 0,
    carbohydrate: 0,
    proteinDiary: 0,
    fat: 0,
    sweet: 0,
  }
}

const TARGET_1200_CALORIE: Target = {
  calorie: 1200,
  serving: {
    vegetable: 4,
    fruit: 3,
    carbohydrate: 4,
    proteinDiary: 3,
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
    proteinDiary: 4,
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
    proteinDiary: 5,
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
    proteinDiary: 6,
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
    proteinDiary: 7,
    fat: 5,
    sweet: 1,
  }
}

export const DEFAULT_TARGET = NO_TARGET;

export interface Target {
  calorie: number;
  serving: {
    vegetable: number;
    fruit: number;
    carbohydrate: number;
    proteinDiary: number;
    fat: number;
    sweet: number;
  };
}

export function isMinLimit(foodGroup: FoodGroup) {
  return (foodGroup === "vegetable" || foodGroup === "fruit");
}

export function isNoTarget(target: Target) {
  return target.calorie === 0;
}

export function hasATarget(target: Target) {
  return !isNoTarget(target);
}

export function targetsByGender(gender: Gender) {
  if (gender === "woman") {
    return [
      NO_TARGET,
      TARGET_1200_CALORIE,
      TARGET_1400_CALORIE,
      TARGET_1600_CALORIE,
      TARGET_1800_CALORIE,
    ];  
  } else {
    return [
      NO_TARGET,
      TARGET_1400_CALORIE,
      TARGET_1600_CALORIE,
      TARGET_1800_CALORIE,
      TARGET_2000_CALORIE,
    ];  
  }
}