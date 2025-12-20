import _ from "lodash";
import { calcFoodCalories } from "./calorieFunction";
import type { Serving } from "./Food";
import type { Target} from "./Target";
import { defaultTargets, getDefaultTarget } from "./Target";

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

  protected _load(): Target[] {
    const targets = this.loader.load();
    if (targets.length === 0) {
      return defaultTargets();
    }
    return targets;
  }

  getAll(): Target[] {
    return this._load();
  }
}

export interface CustomTargetListener {
  targetsUpdated: (targets: Target[]) => void;
  targetUpdated: (target: Target) => void;
}

export class AbstractCustomTargetListener implements CustomTargetListener {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  targetsUpdated(_targets: Target[]): void {
    // Default implementation (can be overridden)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  targetUpdated(_target: Target): void {
    // Default implementation (can be overridden)
  }
}

export class CustomTargets extends ReadOnlyCustomTargets {
  private listeners: CustomTargetListener[] = [];

  constructor(
    loader: CustomTargetsLoader,
    private saver: CustomTargetsSaver,
  ) {
    super(loader);
  }

  registerListener(listener: CustomTargetListener) {
    this.listeners.push(listener);
  }

  unregisterListener(listener: CustomTargetListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private _save(targets: Target[]) {
    this.saver.save(targets);
      this.listeners.forEach(listener => { 
        listener.targetsUpdated(targets); 
      });
  }

  update(target: Target): boolean {
    const targets = this._load();
    const updated = update(targets, target);
    if (updated) {
      this._save(targets);
      this.listeners.forEach(listener => { 
        listener.targetUpdated(target); 
      });
    }
    return updated;
  }
}