import { PreferencesLocalStorage } from "../../app/preferencesLocalStorage";
import { Preferences } from "../../model/preferences";

const preferencesLocalStorage = new PreferencesLocalStorage();
export const preferencesApi = new Preferences(preferencesLocalStorage, preferencesLocalStorage);
