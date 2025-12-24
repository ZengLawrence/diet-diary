import type { Preference, PreferenceLoader, PreferenceSaver } from "../model/preferences";

export class PreferencesLocalStorage implements PreferenceLoader, PreferenceSaver {
  load(): Preference | Omit<Preference, "gender"> | undefined {
    const json = localStorage.getItem("preferences");
    if (!json) return undefined;
    const preferences = JSON.parse(json) as Preference | Omit<Preference, "gender">;
    return preferences;
  }

  save(preferences: Preference): void {
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }
}