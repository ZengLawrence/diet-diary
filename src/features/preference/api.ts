import { PreferencesLocalStorage } from "../../app/preferencesLocalStorage";
import { Preferences } from "../../model/preferences";
import { TargetPreferences } from "../../model/TargetPreferences";
import { customTargets } from "../target";

const preferencesLocalStorage = new PreferencesLocalStorage();
export const preferencesApi = new Preferences(preferencesLocalStorage, preferencesLocalStorage);
export const targetPreferences = new TargetPreferences(preferencesApi, customTargets);
