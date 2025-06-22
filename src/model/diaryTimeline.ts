import { DayWithProgress, ReadOnlyDiaryHistory } from "./diaryHistory";
import { ReadOnlyToday } from "./diary";

export class DiaryTimeline {
  constructor(
    private history: ReadOnlyDiaryHistory,
    private today: ReadOnlyToday
  ) {}

  dayBefore(date: string): DayWithProgress & { currentDate: string | "today" } {
    const historyDay = this.history.dayBefore(date);
    if (historyDay) {
      return {...historyDay, currentDate: historyDay.day.date };
    }
    return {
      day: this.today.currentDay(),
      currentDate: "today",
      progress: {
        daysRemaining: 0,
        totalDays: 0,
      },
    };
  }

  dayAfter(date: string): DayWithProgress & { currentDate: string | "today" } {
    const historyDay = this.history.dayAfter(date);
    if (historyDay) {
      return {...historyDay, currentDate: historyDay.day.date };
    }
    return {
      day: this.today.currentDay(),
      currentDate: "today",
      progress: {
        daysRemaining: 0,
        totalDays: 0,
      },
    };
  }
}
