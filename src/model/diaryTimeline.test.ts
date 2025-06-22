import { DiaryTimeline } from "./diaryTimeline";
import { ReadOnlyDiaryHistory, DayWithProgress } from "./diaryHistory";
import { ReadOnlyToday } from "./diary";

describe("DiaryTimeline", () => {
  let history: jest.Mocked<ReadOnlyDiaryHistory>;
  let today: jest.Mocked<ReadOnlyToday>;
  let timeline: DiaryTimeline;

  beforeEach(() => {
    history = {
      dayBefore: jest.fn(),
      dayAfter: jest.fn(),
    } as unknown as jest.Mocked<ReadOnlyDiaryHistory>;
    today = {
      currentDay: jest.fn(),
    } as unknown as jest.Mocked<ReadOnlyToday>;
    timeline = new DiaryTimeline(history, today);
  });

  const mockServing = {
    vegetable: 0,
    fruit: 0,
    carbohydrate: 0,
    proteinDiary: 0,
    fat: 0,
    sweet: 0,
  };

  describe("dayBefore", () => {
    it("calls dayBefore on history and returns its value", () => {
      const mockResult = {
        day: { date: "2025-06-21", target: { unlimitedFruit: false, calorie: 0, serving: mockServing }, meals: [] },
        currentDate: "2025-06-21",
        progress: { daysRemaining: 1, totalDays: 2 },
      };
      history.dayBefore.mockReturnValueOnce(mockResult);
      const result = timeline.dayBefore("2025-06-22");
      expect(history.dayBefore).toHaveBeenCalledWith("2025-06-22");
      expect(result).toStrictEqual(mockResult);
    });

    it("returns today's current day when no history is available", () => {
      const mockToday = { date: "2025-06-22", target: { unlimitedFruit: false, calorie: 0, serving: mockServing }, meals: [] };
      today.currentDay.mockReturnValueOnce(mockToday);
      history.dayBefore.mockReturnValueOnce(undefined);
      const result = timeline.dayBefore("2025-06-22");
      expect(today.currentDay).toHaveBeenCalled();
      expect(result).toStrictEqual({
        day: mockToday,
        currentDate: "today",
        progress: { daysRemaining: 0, totalDays: 0 },
      });
    });
  });

  describe("dayAfter", () => {
    it("calls dayAfter on history and returns its value", () => {
      const mockResult: DayWithProgress = {
        day: { date: "2025-06-23", target: { unlimitedFruit: false, calorie: 0, serving: mockServing }, meals: [] },
        progress: { daysRemaining: 0, totalDays: 2 },
      };
      history.dayAfter.mockReturnValueOnce(mockResult);
      const result = timeline.dayAfter("2025-06-22");
      expect(history.dayAfter).toHaveBeenCalledWith("2025-06-22");
      expect(result).toBe(mockResult);
    });
  });
});
