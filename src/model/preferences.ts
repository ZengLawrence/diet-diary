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

const DEFAULT_PREFERENCE = {
  startDayWithCalorieTargetLevel: undefined,
}

function isValid(preference: Preference) {
  return preference.startDayWithCalorieTargetLevel === undefined
    || isValidCalorieTargetLevel(preference.startDayWithCalorieTargetLevel);
}

export class Preferences {
  constructor(
    private readonly loader: PreferenceLoader,
    private readonly saver: PreferenceSaver
  ) { }

  get(): Preference {
    const pref = this.loader.load() || DEFAULT_PREFERENCE;
    if (isValid(pref)) {
      return pref;
    } else {
      return DEFAULT_PREFERENCE;
    }
  }

  set(preference: Preference): void {
    if (isValid(preference)) {
      this.saver.save(preference);
    }
  }
}