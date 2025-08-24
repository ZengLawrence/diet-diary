import _ from "lodash";
import { ReadOnlyCustomTargets, Target } from "./customTarget";
import { ReadonlyPreferences } from "./preferences";

export class TargetPreferences {
  constructor(
    private readonly preferences: ReadonlyPreferences,
    private readonly targets: ReadOnlyCustomTargets,
  ) { }

  getStartDayTarget(): Target | undefined {
    const startDayCalorieTarget = this.preferences.getStartDayCalorieTarget();
    if (startDayCalorieTarget.enabled) {
      const calorieLevel = startDayCalorieTarget.level;
      return _.find(this.targets.getAll(), { calorie: calorieLevel }) || undefined;
    }
    return undefined;
  }
}