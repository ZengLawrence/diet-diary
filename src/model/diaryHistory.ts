import { DayPage } from "./diary";

const MAX_DAYS = 7;

function add(history: DayPage[], day: DayPage): DayPage[] {
  const newHistory = [day, ...history];
  if (newHistory.length > MAX_DAYS) {
    return newHistory.slice(0, MAX_DAYS);
  }
  return newHistory;
}

export const mutations = {
  add,
};

export default mutations;

export interface DiaryHistoryLoader {
  load(): DayPage[];
}

export interface DiaryHistorySaver {
  save(history: DayPage[]): void;
}

export interface DayWithProgress {
  day: DayPage;
  progress: {
    daysRemaining: number;
    totalDays: number;
  };
}

export class ReadOnlyDiaryHistory {
  constructor(private loader: DiaryHistoryLoader) { }

  protected _loadHistory(): DayPage[] {
    return this.loader.load();
  }

  dayBefore(date: string): DayWithProgress | undefined {
    const history = this._loadHistory();
    const totalDays = history.length;
    if (totalDays === 0) {
      return undefined; // no history available
    }
    const index = history.findIndex(day => day.date === date);
    if (index === -1) {
      return { day: history[0], progress: { daysRemaining: totalDays - 1, totalDays } };
    }
    if (index === history.length - 1) {
      return { day: history[index], progress: { daysRemaining: 0, totalDays } };
    }
    const prevIndex = index + 1;
    return { day: history[prevIndex], progress: { daysRemaining: totalDays - (prevIndex + 1), totalDays } };
  }

  dayAfter(date: string): DayWithProgress | undefined {
    const history = this._loadHistory();
    const totalDays = history.length;
    if (totalDays === 0) {
      return undefined; // no history available
    }
    const index = history.findIndex(day => day.date === date);
    if (index === 0 || index === -1) {
      return undefined;
    }
    const nextIndex = index - 1;
    return { day: history[nextIndex], progress: { daysRemaining: totalDays - (nextIndex + 1), totalDays } };
  }
}

export class DiaryHistory extends ReadOnlyDiaryHistory {
  private saver: DiaryHistorySaver;

  constructor(loader: DiaryHistoryLoader, saver: DiaryHistorySaver) {
    super(loader);
    this.saver = saver;
  }

  add(day: DayPage): DayPage[] {
    const history = this._loadHistory();
    const newHistory = mutations.add(history, day);
    this.saver.save(newHistory);
    return newHistory;
  }
}