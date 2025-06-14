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
}