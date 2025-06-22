import { ReadOnlyDiaryHistory } from "./diaryHistory";
import { ReadOnlyToday } from "./diary";

export class DiaryTimeline {
  constructor(
    private history: ReadOnlyDiaryHistory,
    private today: ReadOnlyToday
  ) {}

  dayBefore(date: string) {
    return this.history.dayBefore(date);
  }

  dayAfter(date: string) {
    return this.history.dayAfter(date);
  }
}
