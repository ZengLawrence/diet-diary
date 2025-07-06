import _ from "lodash";
import { calcFoodCalories } from "./calorieFunction";
import { Serving } from "./Food";
import { Target, defaultTargets, getDefaultTarget } from "./Target";

export type { Target };

function isServingWithInRange(serving: number): boolean {
  return serving >= 0 && serving <= 9;
}

const LIMIT_TOLERANCE = 60;

function totalCaloriesLimit(calorieLevel: number): number {
  return calorieLevel + LIMIT_TOLERANCE;
}

function exceedsTotalCaloriesLimit(target: { serving: Serving }, calorieLevel: number): boolean {
  return calcFoodCalories(target) > totalCaloriesLimit(calorieLevel);
}

export const validation = {
  isServingWithInRange,
  exceedsTotalCaloriesLimit,
  totalCaloriesLimit,
}

function isValid(target: Target): boolean {
  return (
    isServingWithInRange(target.serving.vegetable) &&
    isServingWithInRange(target.serving.fruit) &&
    isServingWithInRange(target.serving.carbohydrate) &&
    isServingWithInRange(target.serving.proteinDiary) &&
    isServingWithInRange(target.serving.fat) &&
    isServingWithInRange(target.serving.sweet) &&
    !exceedsTotalCaloriesLimit(target, target.calorie)
  );
}

/**
 * Updates a target in the targets array if it exists.
 *
 * @param targets - The array of targets to update.
 * @param target - The target to update in the array.
 * @returns Returns true if the target was updated, false otherwise.
 */
function update(targets: Target[], target: Target): boolean {
  if (!isValid(target)) {
    return false;
  }
  
  const i = _.findIndex(targets, { calorie: target.calorie });
  const found = i > -1;
  if (found) {
    targets[i] = target;
    return true;
  }
  return false;
}

export const mutation = {
  initTargets: defaultTargets,
  update,
}

export default mutation;

export const retrieval = {
  getDefaultTarget,
}

export interface CustomTargetsLoader {
  load: () => Target[];
}

export interface CustomTargetsSaver {
  save: (targets: Target[]) => void;
}

export class ReadOnlyCustomTargets {
  constructor(protected loader: CustomTargetsLoader) {}
  getAll(): Target[] {
    const targets = this.loader.load();
    if (targets.length === 0) {
      return defaultTargets();
    }
    return targets;
  }
}

export class CustomTargets extends ReadOnlyCustomTargets {
  constructor(
    loader: CustomTargetsLoader,
    private saver: CustomTargetsSaver,
  ) {
    super(loader);
  }

  update(target: Target): boolean {
    const targets = this.loader.load();
    const updated = mutation.update(targets, target);
    if (updated) {
      this.saver.save(targets);
    }
    return updated;
  }
}