import { PreferencesLocalStorage } from "../../app/preferencesLocalStorage";
import { Preferences } from "../../model/preferences";
import { UserPreferences } from "../../model/userPreferences";
import { customTargets } from "../target";

const preferencesLocalStorage = new PreferencesLocalStorage();
export const preferencesApi = new Preferences(preferencesLocalStorage, preferencesLocalStorage);
export const userPreferences = new UserPreferences(preferencesApi, customTargets);
