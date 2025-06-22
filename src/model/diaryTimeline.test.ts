import { DiaryTimeline } from "./diaryTimeline";
import { DiaryHistory, DayWithProgress } from "./diaryHistory";

describe("DiaryTimeline", () => {
  let history: jest.Mocked<DiaryHistory>;
  let timeline: DiaryTimeline;

  beforeEach(() => {
    history = {
      dayBefore: jest.fn(),
      dayAfter: jest.fn(),
    } as unknown as jest.Mocked<DiaryHistory>;
    timeline = new DiaryTimeline(history);
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
      const mockResult: DayWithProgress = {
        day: { date: "2025-06-21", target: { unlimitedFruit: false, calorie: 0, serving: mockServing }, meals: [] },
        progress: { daysRemaining: 1, totalDays: 2 },
      };
      history.dayBefore.mockReturnValueOnce(mockResult);
      const result = timeline.dayBefore("2025-06-22");
      expect(history.dayBefore).toHaveBeenCalledWith("2025-06-22");
      expect(result).toBe(mockResult);
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
