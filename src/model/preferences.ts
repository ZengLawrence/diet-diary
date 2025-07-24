import { isValidCalorieTargetLevel } from "./Target";

export interface Preference {
  startDayWithCalorieTargetLevel: number | undefined;
  startDayCalorieTarget: {
    enabled: boolean;
    level: number;
  }
}

export interface PreferenceLoader {
  load: () => Preference | undefined;
}

export interface PreferenceSaver {
  save: (preference: Preference) => void;
}

const DEFAULT_PREFERENCE = {
  startDayWithCalorieTargetLevel: undefined,
  startDayCalorieTarget: {
    enabled: false,
    level: 1600
  }
}

function isValid(preference: Preference) {
  return preference.startDayWithCalorieTargetLevel === undefined
    || isValidCalorieTargetLevel(preference.startDayWithCalorieTargetLevel);
}

function loadPreference(loader: PreferenceLoader): Preference {
  const pref = loader.load();
  if (pref && isValid(pref)) {
    return pref;
  } else {
    return DEFAULT_PREFERENCE;
  }
}

function savePreference(saver: PreferenceSaver, preference: Preference): void {
  if (isValid(preference)) {
    saver.save(preference);
  }
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

  getStartDayCalorieTarget(): Preference["startDayCalorieTarget"] {
    const pref = loadPreference(this.loader);
    return pref.startDayCalorieTarget;
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

  toggleStartDayCalorieTarget(): boolean {
    const startDayCalorieTarget = this.getStartDayCalorieTarget();
    const newEnabled = !startDayCalorieTarget.enabled;
    const newPreference: Preference = {
      ...loadPreference(this.loader),
      startDayCalorieTarget: {
        ...startDayCalorieTarget,
        enabled: newEnabled
      }
    };
    savePreference(this.saver, newPreference);
    return newEnabled;
  }

  setStartDayCalorieTargetLevel(level: number): number {
    if (!isValidCalorieTargetLevel(level)) {
      throw new Error(`Invalid calorie target level: ${level}`);
    }
    const startDayCalorieTarget = this.getStartDayCalorieTarget();
    const newPreference: Preference = {
      ...loadPreference(this.loader),
      startDayCalorieTarget: {
        ...startDayCalorieTarget,
        level
      }
    };
    savePreference(this.saver, newPreference);
    return level;
  }
}