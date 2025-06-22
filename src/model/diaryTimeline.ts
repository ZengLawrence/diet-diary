import { ReadOnlyDiaryHistory } from "./diaryHistory";
export class DiaryTimeline {
  constructor(private history: ReadOnlyDiaryHistory) {}

  dayBefore(date: string) {
    return this.history.dayBefore(date);
  }

  dayAfter(date: string) {
    return this.history.dayAfter(date);
  }
}
