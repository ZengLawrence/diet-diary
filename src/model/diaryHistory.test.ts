import { mutations, DiaryHistory, DiaryHistoryLoader, DiaryHistorySaver } from "./diaryHistory";
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
