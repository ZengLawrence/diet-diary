import { ReadOnlyCustomTargets, Target } from "./customTarget";
import { ReadonlyPreferences } from "./preferences";

export class UserPreferences {
  constructor(
    private readonly preferences: ReadonlyPreferences,
    private readonly targets: ReadOnlyCustomTargets,
  ) { }

  getStartDayTarget(): Target | undefined {
    return undefined;
  }
}