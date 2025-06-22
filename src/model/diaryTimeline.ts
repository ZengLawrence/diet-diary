export class DiaryTimeline {
  constructor(private history: import("./diaryHistory").DiaryHistory) {}

  dayBefore(date: string) {
    return this.history.dayBefore(date);
  }

  dayAfter(date: string) {
    return this.history.dayAfter(date);
  }
}
