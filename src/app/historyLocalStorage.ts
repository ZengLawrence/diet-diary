import type { DayPage } from "../model/DayPage";
import type { DiaryHistoryLoader, DiaryHistorySaver } from "../model/diaryHistory";

interface SerializedHistory {
  days: DayPage[];
}

function loadHistory(): SerializedHistory | undefined {
  try {
    const history = localStorage.getItem('history');
    if (history === null) {
      return undefined;
    }
    const serializedHistory: SerializedHistory = JSON.parse(history) as SerializedHistory;
    return serializedHistory;
  } catch (e) {
    console.error("Error loading history from localStorage", e);
    return undefined;
  }
}

function saveHistory(history: SerializedHistory): void {
  try {
    const serializedHistory = JSON.stringify(history);
    localStorage.setItem('history', serializedHistory);
  } catch {
    // ignore write errors
  }
}

export class HistoryLocalStorage implements DiaryHistoryLoader, DiaryHistorySaver {
  load(): DayPage[] {
    const history = loadHistory();
    return history ? history.days : [];
  }

  save(history: DayPage[]): void {
    saveHistory({ days: history });
  }
}