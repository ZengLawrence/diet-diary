import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import { TodayLocalStorage } from "../../app/todayLocalStorage";
import { createDiary } from "../../model/diary";
import { DiaryHistory } from "../../model/diaryHistory";
import { TargetPreferences } from "../../model/TargetPreferences";
import { Today } from "../../model/today";
import { preferencesApi } from "../preference/api";
import { customTargets } from "../target";

const historyLocalStorage = new HistoryLocalStorage();
export const diaryHistory = new DiaryHistory(historyLocalStorage, historyLocalStorage);

const todayLocalStorage = new TodayLocalStorage();
export const today = new Today(todayLocalStorage, todayLocalStorage);

const targetPreferences = new TargetPreferences(preferencesApi, customTargets);
export const diary = createDiary(
  today,
  diaryHistory,
  targetPreferences,
  customTargets
);
