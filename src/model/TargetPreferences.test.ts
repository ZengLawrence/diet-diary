import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { ReadOnlyCustomTargets } from "./customTarget";
import { Preferences } from "./preferences";
import { TargetPreferences } from "./TargetPreferences";

describe("TargetPreferences class", () => {
  const mockPreferences = Object.create(Preferences.prototype);
  mockPreferences.getStartDayCalorieTarget = jest.fn();
  const mockTargets = Object.create(ReadOnlyCustomTargets.prototype);
  mockTargets.getAll = jest.fn();
  const targetPreferences = new TargetPreferences(mockPreferences, mockTargets);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getStartDayTarget", () => {
    it("should return target if preference is set", () => {
      mockPreferences.getStartDayCalorieTarget.mockReturnValue(
        {
          enabled: true,
          level: 1600,
        }
      );
      mockTargets.getAll.mockReturnValue([
        { calorie: 1400, serving: {} },
        { calorie: 1600, serving: {} },
        { calorie: 1800, serving: {} },
      ]);

      expect(targetPreferences.getStartDayTarget()).toEqual(expect.objectContaining({ calorie: 1600 }));
    });

    it("should return undefined if startDayCalorieTarget is disabled", () => {
      mockPreferences.getStartDayCalorieTarget.mockReturnValue(
        {
          enabled: false,
          level: 1600,
        }
      );
      mockTargets.getAll.mockReturnValue([
        { calorie: 1400, serving: {} },
        { calorie: 1600, serving: {} },
        { calorie: 1800, serving: {} },
      ]);

      expect(targetPreferences.getStartDayTarget()).toBeUndefined();
    });

  })
});