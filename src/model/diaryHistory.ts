import { DayPage } from "./diary";

const MAX_DAYS = 7;

function add(history: DayPage[], day: DayPage): DayPage[] {
  const newHistory = [day, ...history];
  if (newHistory.length > MAX_DAYS) {
    return newHistory.slice(0, MAX_DAYS);
  }
  return newHistory;
}

function dayBefore(history: DayPage[], date: string){
  const totalDays = history.length;
  const index = history.findIndex(day => day.date === date);
  if (index > 0) {
    const prevIndex = index + 1;
    return { day: history[prevIndex], progress: { daysRemaining: totalDays - (prevIndex + 1), totalDays } };
  }
  // either today or day not in history; default to the first day in history.
  return { day: history[0], progress: { daysRemaining: totalDays - 1, totalDays } };
}

export const mutations = {
  add,
};

export default mutations;

export interface DiaryHistoryLoader {
  load(): DayPage[] | undefined;
}

export interface DiaryHistorySaver {
  save(history: DayPage[]): void;
}

export class DiaryHistory {
  constructor(private loader: DiaryHistoryLoader, private saver: DiaryHistorySaver) {}

  private load(): DayPage[] | undefined {
    return this.loader.load();
  }

  private save(history: DayPage[]): void {
    this.saver.save(history);
  }

  add(day: DayPage): DayPage[] {
    const history = this.load() || [];
    const newHistory = mutations.add(history, day);
    this.save(newHistory);
    return newHistory;
  }

  dayBefore(date: string): {day: DayPage, progress: {daysRemaining: number, totalDays: number}} {
    const history = this.load() || [];
    if (history.length === 0) {
      throw new Error("No history available to find the day before.");
    }
    return dayBefore(history, date);
  }
}