import { mutations, DiaryHistory, DiaryHistoryLoader, DiaryHistorySaver, DiaryTimeline } from "./diaryHistory";
import { DayPage } from "./diary";

function makeDay(date: string): DayPage {
  return {
    date,
    target: {
      unlimitedFruit: false, calorie: 2000, serving: {
        vegetable: 0,
        fruit: 0,
        carbohydrate: 0,
        proteinDiary: 0,
        fat: 0,
        sweet: 0
      }
    },
    meals: [],
  };
}

describe("mutations", () => {
  describe("add", () => {

    it("adds a new day to empty history", () => {
      const day = makeDay("2025-06-01");
      const result = mutations.add([], day);
      expect(result).toEqual([day]);
    });

    it("adds a new day to non-empty history", () => {
      const day1 = makeDay("2025-05-31");
      const day2 = makeDay("2025-06-01");
      const result = mutations.add([day1], day2);
      expect(result).toEqual([day2, day1]);
    });

    it("keeps only the latest 7 days", () => {
      const days = Array.from({ length: 7 }, (_, i) => makeDay(`2025-05-${24 + i}`));
      const newDay = makeDay("2025-06-01");
      const result = mutations.add(days, newDay);
      expect(result.length).toBe(7);
      expect(result[0]).toBe(newDay);
      expect(result.slice(1)).toEqual(days.slice(0, 6));
    });

  });
});

describe("DiaryHistory class", () => {
  describe("load history before add and save after", () => {
    it("should load existing history, add a new day, and save the updated history", () => {
      const loader: DiaryHistoryLoader = {
        load: jest.fn().mockReturnValue([{ date: "2025-05-31", meals: [] }]),
      };
      const saver: DiaryHistorySaver = {
        save: jest.fn(),
      };
      const history = new DiaryHistory(loader, saver);

      const newDay = makeDay("2025-06-01");
      const result = history.add(newDay);

      expect(loader.load).toHaveBeenCalled();
      expect(saver.save).toHaveBeenCalledWith([newDay, { date: "2025-05-31", meals: [] }]);
      expect(result).toEqual([newDay, { date: "2025-05-31", meals: [] }]);
    });
  });
});

describe("DiaryTimeline class", () => {
  describe("dayBefore", () => {
    it("returns the previous day and progress if date is found and not the first", () => {
      const loader: DiaryHistoryLoader = {
        load: jest.fn().mockReturnValue([
          makeDay("2025-06-01"),
          makeDay("2025-05-31"),
          makeDay("2025-05-30"),
        ]),
      };
      const timeline = new DiaryTimeline(loader);
      const result = timeline.dayBefore("2025-05-31");
      expect(result).toBeDefined();
      if (result) {
        expect(result.day.date).toBe("2025-05-30");
        expect(result.progress).toEqual({ daysRemaining: 0, totalDays: 3 });
      }
    });

    it("returns the next day and progress if date is the first in history", () => {
      const loader: DiaryHistoryLoader = {
        load: jest.fn().mockReturnValue([
          makeDay("2025-06-01"),
          makeDay("2025-05-31"),
        ]),
      };
      const timeline = new DiaryTimeline(loader);
      const result = timeline.dayBefore("2025-06-01");
      expect(result).toBeDefined();
      if (result) {
        expect(result.day.date).toBe("2025-05-31");
        expect(result.progress).toEqual({ daysRemaining: 0, totalDays: 2 });
      }
    });

    it("returns the first day and progress if date is not found in history", () => {
      const loader: DiaryHistoryLoader = {
        load: jest.fn().mockReturnValue([
          makeDay("2025-06-01"),
          makeDay("2025-05-31"),
        ]),
      };
      const timeline = new DiaryTimeline(loader);
      const result = timeline.dayBefore("2025-06-02");
      expect(result).toBeDefined();
      if (result) {
        expect(result.day.date).toBe("2025-06-01");
        expect(result.progress).toEqual({ daysRemaining: 1, totalDays: 2 });
      }
    });

    it("returns undefined if history is empty", () => {
      const loader: DiaryHistoryLoader = { load: jest.fn().mockReturnValue([]) };
      const timeline = new DiaryTimeline(loader);
      const result = timeline.dayBefore("2025-06-01");
      expect(result).toBeUndefined();
    });
  });

  describe("dayAfter", () => {
    it("returns the next day and progress if date is found and not the last", () => {
      const loader: DiaryHistoryLoader = {
        load: jest.fn().mockReturnValue([
          makeDay("2025-06-01"),
          makeDay("2025-05-31"),
          makeDay("2025-05-30"),
        ]),
      };
      const timeline = new DiaryTimeline(loader);
      const result = timeline.dayAfter("2025-05-30");
      expect(result).toBeDefined();
      if (result) {
        expect(result.day.date).toBe("2025-05-31");
        expect(result.progress).toEqual({ daysRemaining: 1, totalDays: 3 });
      }

      const result2 = timeline.dayAfter("2025-05-31");
      expect(result2).toBeDefined();
      if (result2) {
        expect(result2.day.date).toBe("2025-06-01");
        expect(result2.progress).toEqual({ daysRemaining: 2, totalDays: 3 });
      }
    });

    it("returns undefined if date is the last in history", () => {
      const loader: DiaryHistoryLoader = {
        load: jest.fn().mockReturnValue([
          makeDay("2025-06-01"),
          makeDay("2025-05-31"),
        ]),
      };
      const timeline = new DiaryTimeline(loader);
      const result = timeline.dayAfter("2025-06-01");
      expect(result).toBeUndefined();
    });

    it("returns undefined if date is not found in history", () => {
      const loader: DiaryHistoryLoader = {
        load: jest.fn().mockReturnValue([
          makeDay("2025-06-01"),
          makeDay("2025-05-31"),
        ]),
      };
      const timeline = new DiaryTimeline(loader);
      const result = timeline.dayAfter("2025-06-02");
      expect(result).toBeUndefined();
    });

    it("returns undefined if history is empty", () => {
      const loader: DiaryHistoryLoader = { load: jest.fn().mockReturnValue([]) };
      const timeline = new DiaryTimeline(loader);
      const result = timeline.dayAfter("2025-06-01");
      expect(result).toBeUndefined();
    });
  });
});
