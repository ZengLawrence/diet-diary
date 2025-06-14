import { DayPage } from "../model/diary";
import { DiaryHistoryLoader, DiaryHistorySaver } from "../model/diaryHistory";
import { RootState } from "./store";

export function loadHistory(): RootState['history'] | undefined {
  try {
    const history = localStorage.getItem('history');
    if (history === null) {
      return undefined;
    }
    return JSON.parse(history);
  } catch (e) {
    console.error("Error loading history from localStorage", e);
    return undefined;
  }
}

export function saveHistory(history: RootState['history']): void {
  try {
    const serializedHistory = JSON.stringify(history);
    localStorage.setItem('history', serializedHistory);
  } catch {
    // ignore write errors
  }
}

export class HistoryLocalStorage implements DiaryHistoryLoader, DiaryHistorySaver {
  load(): DayPage[] | undefined {
    const history = loadHistory();
    return history ? history.days : undefined;
  }

  save(history: DayPage[]): void {
    saveHistory({ days: history });
  }
}