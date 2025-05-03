import { calcFoodCalories } from "../model/calorieFunction";
import { Serving } from "../model/Food";

export function isValid(serving: number): boolean {
  return serving >= 0 && serving <= 9;
}

const LIMIT_TOLERANCE = 60;

export function exceedsTotalCaloriesLimit(target: { serving: Serving }, calorieLevel: number): boolean {
  const limit = calorieLevel + LIMIT_TOLERANCE;
  return calcFoodCalories(target) > limit;
}