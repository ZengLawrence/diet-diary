import type { DayWithProgress, ReadOnlyDiaryHistory } from "./diaryHistory";
import type { ReadOnlyToday } from "./today";

export class DiaryTimeline {
  constructor(
    private history: ReadOnlyDiaryHistory,
    private today: ReadOnlyToday
  ) {}

  dayBefore(date: string): DayWithProgress & { currentDate: string } {
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

  dayAfter(date: string): DayWithProgress & { currentDate: string } {
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

  goToToday(): DayWithProgress & { currentDate: string } {
    const todayDay = this.today.currentDay();
    return {
      day: todayDay,
      currentDate: "today",
      progress: {
        daysRemaining: 0,
        totalDays: 0,
      },
    };
  }
}
