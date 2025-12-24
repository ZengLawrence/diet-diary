import type { DayPage } from "../model/DayPage";
import type { TodayLoader, TodaySaver } from "../model/today";

function loadToday(): DayPage | undefined {
  try {
    const serializedState = localStorage.getItem('today');
    if (serializedState === null) {
      return undefined;
    }
    const dayPage: DayPage = JSON.parse(serializedState) as DayPage;
    return dayPage;
  } catch (e) {
    console.error("Error loading today from localStorage", e);
    return undefined;
  }
}

function saveToday(state: DayPage): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('today', serializedState);
  } catch {
    // ignore write errors
  }
}

export class TodayLocalStorage implements TodayLoader, TodaySaver {
  load(defaultFn: () => DayPage): DayPage {
    const today = loadToday();
    if (today) {
      return today;
    }
    return defaultFn();
  }

  save(day: DayPage): void {
    saveToday(day);
  }
}
