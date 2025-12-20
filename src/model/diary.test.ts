import { beforeEach, describe, expect, it } from "@jest/globals";
import type { MockProxy } from "jest-mock-extended";
import { mock } from "jest-mock-extended";
import { Diary } from "./diary";
import type { DiaryHistory } from "./diaryHistory";
import { newMeal } from "./Food";
import { getDefaultTarget } from "./Target";
import type { TargetPreferences } from "./TargetPreferences";
import type { Today } from "./today";

describe("Diary class", () => {
  let mockDiaryHistory: MockProxy<DiaryHistory>;
  let mockToday: MockProxy<Today>;

  beforeEach(() => {
    mockDiaryHistory = mock<DiaryHistory>();
    mockToday = mock<Today>();
  });

  describe("newDay", () => {
    let mockTargetPreferences: MockProxy<TargetPreferences>;
    let diary: Diary;

    beforeEach(() => {
      mockTargetPreferences = mock<TargetPreferences>();
      mockTargetPreferences.getStartDayTarget.mockReturnValue(undefined);
      diary = new Diary(mockToday, mockDiaryHistory, mockTargetPreferences);
    });

    it("should create a new DayPage with today's date", () => {
      const previousDay = {
        date: "6/1/2025",
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: [],
      };
      const todayDate = new Date().toLocaleDateString();
      const currentDay = {
        date: todayDate,
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: [],
      };
      mockToday.newDay.mockReturnValue({ current: currentDay, previous: previousDay });

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
      mockToday.newDay.mockReturnValue({ current, previous: undefined });

      const day = diary.newDay();
      expect(day).toEqual(current);
      expect(mockDiaryHistory.add).not.toHaveBeenCalled();
    });

    it("should create a new DayPage with user's start day target", () => {
      const previousDay = {
        date: "6/1/2025",
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: [],
      };
      const startDayTarget = { ...getDefaultTarget(), unlimitedFruit: true, calorie: 1500 };
      const currentDay = {
        date: new Date().toLocaleDateString(),
        target: startDayTarget,
        meals: [],
      };
      mockToday.newDay.mockReturnValue({ current: currentDay, previous: previousDay });
      mockTargetPreferences.getStartDayTarget.mockReturnValue(startDayTarget);

      const day = diary.newDay();
      expect(day.target).toEqual(startDayTarget);
      expect(mockDiaryHistory.add).toHaveBeenCalledWith(previousDay);
    });
  });

});
