import { Preference, PreferenceLoader, PreferenceSaver } from "../model/preferences";

export class PreferencesLocalStorage implements PreferenceLoader, PreferenceSaver {
  load(): Partial<Preference> | undefined {
    const json = localStorage.getItem("preferences");
    if (!json) return undefined;
    return JSON.parse(json);
  }

  save(preferences: Preference): void {
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }
}