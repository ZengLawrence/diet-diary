import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { mock } from "jest-mock-extended";
import type { DayPage } from "./DayPage";
import type { DiaryHistoryLoader, DiaryHistorySaver} from "./diaryHistory";
import { DiaryHistory, ReadOnlyDiaryHistory } from "./diaryHistory";

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

describe("DiaryHistory class", () => {
  const loader = mock<DiaryHistoryLoader>();
  let saver: DiaryHistorySaver;
  let history: DiaryHistory;

  beforeEach(() => {
    loader.load.mockReturnValue([]);
    saver = {
      save: jest.fn(),
    };
    history = new DiaryHistory(loader, saver);
  });

  describe("add", () => {
    it("adds a new day to empty history", () => {
      loader.load.mockReturnValue([]);
      const day = makeDay("2025-06-01");
      const result = history.add(day);
      expect(result).toEqual([day]);
      expect(saver.save).toHaveBeenCalledWith([day]);
    });

    it("adds a new day to non-empty history", () => {
      const day1 = makeDay("2025-05-31");
      const day2 = makeDay("2025-06-01");
      loader.load.mockReturnValue([day1]);
      const result = history.add(day2);
      expect(result).toEqual([day2, day1]);
      expect(saver.save).toHaveBeenCalledWith([day2, day1]);
    });

    it("keeps only the latest 7 days", () => {
      const days = Array.from({ length: 7 }, (_, i) => makeDay(`2025-05-${24 + i}`));
      const newDay = makeDay("2025-06-01");
      loader.load.mockReturnValue(days);
      const result = history.add(newDay);
      expect(result.length).toBe(7);
      expect(result[0]).toBe(newDay);
      expect(result.slice(1)).toEqual(days.slice(0, 6));
      expect(saver.save).toHaveBeenCalledWith(result);
    });
  });

  describe("load history before add and save after", () => {
    it("should load existing history, add a new day, and save the updated history", () => {
      const previousDay = makeDay("2025-05-31");
      loader.load.mockReturnValue([previousDay]);
      const newDay = makeDay("2025-06-01");
      const result = history.add(newDay);

      expect(loader.load).toHaveBeenCalled();
      expect(saver.save).toHaveBeenCalledWith([newDay, previousDay]);
      expect(result).toEqual([newDay, previousDay]);
    });

    describe("notify listener if a listener is registered", () => {
      const listener = {
        dayAdded: jest.fn(),
      };

      beforeEach(() => {
        listener.dayAdded = jest.fn();
      });

      it("should notify listener when a new day is added", () => {
        history.registerListener(listener);
        const newDay = makeDay("2025-06-01");
        history.add(newDay);
        expect(listener.dayAdded).toHaveBeenCalled();
      });

      it("should not notify listener if the listener is unregistered", () => {
        history.unregisterListener(listener);
        const newDay = makeDay("2025-06-02");
        history.add(newDay);
        expect(listener.dayAdded).not.toHaveBeenCalled();
      });
    });
  });
});

describe("ReadOnlyDiaryHistory", () => {
  const loader = mock<DiaryHistoryLoader>();
  let history: ReadOnlyDiaryHistory;

  beforeEach(() => {
    history = new ReadOnlyDiaryHistory(loader);
  });

  describe("dayBefore", () => {
    it("returns the previous day and progress if date is found and not the first", () => {
      loader.load.mockReturnValue([
        makeDay("2025-06-01"),
        makeDay("2025-05-31"),
        makeDay("2025-05-30"),
      ]);
      const result = history.dayBefore("2025-05-31");
      expect(result).toBeDefined();
      expect(result?.day.date).toBe("2025-05-30");
      expect(result?.progress).toEqual({ daysRemaining: 0, totalDays: 3 });
    });

    it("returns the next day and progress if date is the first in history", () => {
      loader.load.mockReturnValue([
        makeDay("2025-06-01"),
        makeDay("2025-05-31"),
      ]);
      const result = history.dayBefore("2025-06-01");
      expect(result).toBeDefined();
      expect(result?.day.date).toBe("2025-05-31");
      expect(result?.progress).toEqual({ daysRemaining: 0, totalDays: 2 });
    });

    it("returns the first day and progress if date is not found in history", () => {
      loader.load.mockReturnValue([
        makeDay("2025-06-01"),
        makeDay("2025-05-31"),
      ]);
      const result = history.dayBefore("2025-06-02");
      expect(result).toBeDefined();
      expect(result?.day.date).toBe("2025-06-01");
      expect(result?.progress).toEqual({ daysRemaining: 1, totalDays: 2 });
    });

    it("returns undefined if history is empty", () => {
      loader.load.mockReturnValue([]);
      const result = history.dayBefore("2025-06-01");
      expect(result).toBeUndefined();
    });
  });

  describe("dayAfter", () => {
    it("returns the next day and progress if date is found and not the last", () => {
      loader.load.mockReturnValue([
        makeDay("2025-06-01"),
        makeDay("2025-05-31"),
        makeDay("2025-05-30"),
      ]);
      const result = history.dayAfter("2025-05-30");
      expect(result).toBeDefined();
      expect(result?.day.date).toBe("2025-05-31");
      expect(result?.progress).toEqual({ daysRemaining: 1, totalDays: 3 });

      const result2 = history.dayAfter("2025-05-31");
      expect(result2).toBeDefined();
      expect(result2?.day.date).toBe("2025-06-01");
      expect(result2?.progress).toEqual({ daysRemaining: 2, totalDays: 3 });
    });

    it("returns undefined if date is the last in history", () => {
      loader.load.mockReturnValue([
        makeDay("2025-06-01"),
        makeDay("2025-05-31"),
      ]);
      const result = history.dayAfter("2025-06-01");
      expect(result).toBeUndefined();
    });

    it("returns undefined if date is not found in history", () => {
      loader.load.mockReturnValue([
        makeDay("2025-06-01"),
        makeDay("2025-05-31"),
      ]);
      const result = history.dayAfter("2025-06-02");
      expect(result).toBeUndefined();
    });

    it("returns undefined if history is empty", () => {
      loader.load.mockReturnValue([]);
      const result = history.dayAfter("2025-06-01");
      expect(result).toBeUndefined();
    });

    describe("totalWeightLoss", () => {
      beforeEach(() => {
        loader.load.mockReturnValue([
          {
            ...makeDay("2025-06-01"), meals: [
              { mealTime: "lunch", foods: [{ description: "salad", serving: { vegetable: 2, fat: 3 } }] }
            ]
          },
          {
            ...makeDay("2025-05-31"), meals: [
              { mealTime: "dinner", foods: [{ description: "burger", serving: { proteinDiary: 2, fat: 2, carbohydrate: 3 } }] }
            ]
          },
        ]);
      });

      it("calculates total weight loss for woman", () => {
        const result = history.totalWeightLoss("woman");
        expect(result).toBeCloseTo(-0.827, 3);
      });

      it("calculates total weight loss for man", () => {
        const result = history.totalWeightLoss("man");
        expect(result).toBeCloseTo(-0.941, 3);
      });

      it("returns 0 if history is empty", () => {
        loader.load.mockReturnValue([]);
        const result = history.totalWeightLoss("woman");
        expect(result).toBe(0);
      });
    });
  });
});
