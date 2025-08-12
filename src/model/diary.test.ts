import { Diary } from "./diary";
import { DiaryHistory } from "./diaryHistory";
import { newMeal } from "./Food";
import { getDefaultTarget } from "./Target";
import { Today } from "./today";
import { UserPreferences } from "./userPreferences";

describe("Diary class", () => {
  let mockDiaryHistory: DiaryHistory;
  let mockToday: Today;

  beforeEach(() => {
    mockDiaryHistory = Object.create(DiaryHistory.prototype);
    mockDiaryHistory.add = jest.fn();
    mockToday = Object.create(Today.prototype);
    mockToday.newDay = jest.fn();
  });

  describe("newDay", () => {
    let mockUserPreferences: UserPreferences;
    let diary: Diary;

    beforeEach(() => {
      mockUserPreferences = Object.create(UserPreferences.prototype);
      mockUserPreferences.getStartDayTarget = jest.fn().mockReturnValue(undefined);
      diary = new Diary(mockToday, mockDiaryHistory, mockUserPreferences);
    });

    it("should create a new DayPage with today's date", () => {
      const previousDay = {
        date: "6/1/2025",
        target: getDefaultTarget(),
        meals: [],
      };
      const todayDate = new Date().toLocaleDateString();
      const currentDay = {
        date: todayDate,
        target: getDefaultTarget(),
        meals: [],
      };
      mockToday.newDay = jest.fn().mockReturnValue({ current: currentDay, previous: previousDay });

      const day = diary.newDay();
      expect(day.date).toBe(todayDate);
      expect(mockDiaryHistory.add).toHaveBeenCalledWith(previousDay);
    });

    it("should use the provided current day if it is today", () => {
      const customTarget = { ...getDefaultTarget(), unlimitedFruit: true, calorie: 1234 };
      const current = {
        date: new Date().toLocaleDateString(),
        target: customTarget,
        meals: [newMeal()],
      };
      mockToday.newDay = jest.fn().mockReturnValue({ current, previous: undefined });

      const day = diary.newDay();
      expect(day).toEqual(current);
      expect(mockDiaryHistory.add).not.toHaveBeenCalled();
    });

    it("should create a new DayPage with user's start day target", () => {
      const previousDay = {
        date: "6/1/2025",
        target: getDefaultTarget(),
        meals: [],
      };
      const startDayTarget = { ...getDefaultTarget(), unlimitedFruit: true, calorie: 1500 };
      const currentDay = {
        date: new Date().toLocaleDateString(),
        target: startDayTarget,
        meals: [],
      };
      mockToday.newDay = jest.fn().mockReturnValue({ current: currentDay, previous: previousDay });
      mockUserPreferences.getStartDayTarget = jest.fn().mockReturnValue(startDayTarget);

      const day = diary.newDay();
      expect(day.target).toEqual(startDayTarget);
      expect(mockDiaryHistory.add).toHaveBeenCalledWith(previousDay);
    });
  });

});
