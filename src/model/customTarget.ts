import _ from "lodash";
import { calcFoodCalories } from "./calorieFunction";
import { Serving } from "./Food";
import { Target } from "./Target";

export function isValid(serving: number): boolean {
  return serving >= 0 && serving <= 9;
}

const LIMIT_TOLERANCE = 60;

export function totalCaloriesLimit(calorieLevel: number): number {
  return calorieLevel + LIMIT_TOLERANCE;
}

export function exceedsTotalCaloriesLimit(target: { serving: Serving }, calorieLevel: number): boolean {
  return calcFoodCalories(target) > totalCaloriesLimit(calorieLevel);
}

/**
 * Updates a target in the targets array if it exists.
 *
 * @param targets - The array of targets to update.
 * @param target - The target to update in the array.
 * @returns Returns true if the target was updated, false otherwise.
 */
export function update(targets: Target[], target: Target): boolean {
  const i = _.findIndex(targets, { calorie: target.calorie });
  if (i > -1) {
    targets[i] = target;
    return true;
  }
  return false;
}