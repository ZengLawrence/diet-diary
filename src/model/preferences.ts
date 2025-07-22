import { isValidCalorieTargetLevel } from "./Target";

export interface Preference {
  startDayWithCalorieTargetLevel: number | undefined;
}

export interface PreferenceLoader {
  load: () => Preference | undefined;
}

export interface PreferenceSaver {
  save: (preference: Preference) => void;
}

const DEFAULT_PREFERENCE = {
  startDayWithCalorieTargetLevel: undefined,
}

function isValid(preference: Preference) {
  return preference.startDayWithCalorieTargetLevel === undefined
    || isValidCalorieTargetLevel(preference.startDayWithCalorieTargetLevel);
}

export class ReadonlyPreferences {
  constructor(protected readonly loader: PreferenceLoader) { }

  get(): Preference {
    const pref = this.loader.load() || DEFAULT_PREFERENCE;
    if (isValid(pref)) {
      return pref;
    } else {
      return DEFAULT_PREFERENCE;
    }
  }

}

export class Preferences extends ReadonlyPreferences {
  constructor(
    loader: PreferenceLoader,
    private readonly saver: PreferenceSaver
  ) {
    super(loader);
  }

  set(preference: Preference): void {
    if (isValid(preference)) {
      this.saver.save(preference);
    }
  }
}