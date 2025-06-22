import { DiaryHistory } from "./diaryHistory";
export class DiaryTimeline {
  constructor(private history: DiaryHistory) {}

  dayBefore(date: string) {
    return this.history.dayBefore(date);
  }

  dayAfter(date: string) {
    return this.history.dayAfter(date);
  }
}
