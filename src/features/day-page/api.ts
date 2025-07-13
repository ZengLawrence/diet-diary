import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import { TodayLocalStorage } from "../../app/todayLocalStorage";
import { Diary, Today } from "../../model/diary";
import { DiaryHistory } from "../../model/diaryHistory";

const historyLocalStorage = new HistoryLocalStorage();
const diaryHistory = new DiaryHistory(historyLocalStorage, historyLocalStorage);

const todayLocalStorage = new TodayLocalStorage();
export const today = new Today(todayLocalStorage, todayLocalStorage, diaryHistory);
export const diary = new Diary(todayLocalStorage, todayLocalStorage, diaryHistory);
