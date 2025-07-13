import { isValidCalorieTargetLevel } from "./Target";

interface Preference {
  startDayWithCalorieTargetLevel: number | undefined;
}

export interface PreferenceLoader {
  load: () => Preference | undefined;
}

export interface PreferenceSaver {
  save: (preference: Preference) => void;
}

export class Preferences {
  constructor(
    private readonly loader: PreferenceLoader,
    private readonly saver: PreferenceSaver
  ) { }

  get(): Preference {
    const pref = this.loader.load();
    return pref || { startDayWithCalorieTargetLevel: undefined };
  }

  set(preference: Preference): void {
    if (preference.startDayWithCalorieTargetLevel === undefined
      || isValidCalorieTargetLevel(preference.startDayWithCalorieTargetLevel)
    ) {
      this.saver.save(preference);
    }
  }
}