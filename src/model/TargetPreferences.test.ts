import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { ReadOnlyCustomTargets} from "./customTarget";
import { type Target } from "./customTarget";
import type { Preferences } from "./preferences";
import { TargetPreferences } from "./TargetPreferences";

const DEFAULT_TARGET: Target = {
  calorie: 1600,
  serving: {
    vegetable: 0,
    fruit: 0,
    carbohydrate: 0,
    proteinDiary: 0,
    fat: 0,
    sweet: 0,
  },
};

describe("TargetPreferences class", () => {
  const mockPreferences = {
    getStartDayCalorieTarget: jest.fn<typeof Preferences.prototype.getStartDayCalorieTarget>(),
  } as unknown as jest.Mocked<Preferences>;
  const mockTargets = {
    getAll: jest.fn<typeof ReadOnlyCustomTargets.prototype.getAll>(),
  } as unknown as jest.Mocked<ReadOnlyCustomTargets>;
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
        { ...DEFAULT_TARGET, calorie: 1400 },
        { ...DEFAULT_TARGET, calorie: 1600 },
        { ...DEFAULT_TARGET, calorie: 1800 },
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
        { ...DEFAULT_TARGET, calorie: 1400 },
        { ...DEFAULT_TARGET, calorie: 1600 },
        { ...DEFAULT_TARGET, calorie: 1800 },
      ]);

      expect(targetPreferences.getStartDayTarget()).toBeUndefined();
    });

  })
});