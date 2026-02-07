import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import { SavedFoodLocalStorage } from "../../app/savedFoodLocalStorage";
import { TodayLocalStorage } from "../../app/todayLocalStorage";
import { createDiary } from "../../model/diary";
import { DiaryHistory } from "../../model/diaryHistory";
import { SavedFoods } from "../../model/savedFoods";
import { Today } from "../../model/today";
import { preferencesApi } from "../preference/api";
import { suggestions } from "../suggestions/SavedFoodSuggestion";
import { customTargets } from "../target";

const historyLocalStorage = new HistoryLocalStorage();
export const diaryHistory = new DiaryHistory(historyLocalStorage, historyLocalStorage);

const todayLocalStorage = new TodayLocalStorage();
export const today = new Today(todayLocalStorage, todayLocalStorage);

export const diary = createDiary(
  today,
  diaryHistory,
  preferencesApi,
  customTargets
);

function createInMemorySavedFoods() {
  const loader = new SavedFoodLocalStorage();
  const saver = loader;
  return new SavedFoods(loader, saver, suggestions);
}

export const savedFoods = createInMemorySavedFoods();