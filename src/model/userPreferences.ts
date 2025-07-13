import _ from "lodash";
import { ReadOnlyCustomTargets, Target } from "./customTarget";
import { ReadonlyPreferences } from "./preferences";

export class UserPreferences {
  constructor(
    private readonly preferences: ReadonlyPreferences,
    private readonly targets: ReadOnlyCustomTargets,
  ) { }

  getStartDayTarget(): Target | undefined {
    const pref = this.preferences.get();
    if (pref) {
      const calorieLevel = pref.startDayWithCalorieTargetLevel;
      return _.find(this.targets.getAll(), {calorie: calorieLevel});
    }
    return undefined;
  }
}