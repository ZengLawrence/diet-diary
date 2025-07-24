import { CustomTargets } from "./customTarget";
import { Preferences } from "./preferences";
import { UserPreferences } from "./userPreferences";

describe("UserPreferences class", () => {
  const mockPreferences = Object.create(Preferences.prototype);
  mockPreferences.getStartDayCalorieTarget = jest.fn();
  const mockTargets = Object.create(CustomTargets.prototype);
  mockTargets.getAll = jest.fn();
  const userPreferences = new UserPreferences(mockPreferences, mockTargets);

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

      expect(userPreferences.getStartDayTarget()).toEqual(expect.objectContaining({ calorie: 1600 }));
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

      expect(userPreferences.getStartDayTarget()).toBeUndefined();
    });

  })
});