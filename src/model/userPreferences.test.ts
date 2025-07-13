import { CustomTargets } from "./customTarget";
import { Preferences } from "./preferences";
import { UserPreferences } from "./userPreferences";

describe("UserPreferences class", () => {
  const mockPreferences = Object.create(Preferences.prototype);
  mockPreferences.get = jest.fn();
  const mockTargets = Object.create(CustomTargets.prototype);
  mockTargets.getAll = jest.fn();
  const userPreferences = new UserPreferences(mockPreferences, mockTargets);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getStartDayTarget", () => {
    it("should return undefined if there is no preference", () => {
      expect(userPreferences.getStartDayTarget()).toBeUndefined();
    });

    it("should return target if preference is set", () => {
      mockPreferences.get.mockReturnValue({ startDayWithCalorieTargetLevel: 1600 });
      mockTargets.getAll.mockReturnValue([
        { calorie: 1400, serving: {} },
        { calorie: 1600, serving: {} },
        { calorie: 1800, serving: {} },
      ]);

      expect(userPreferences.getStartDayTarget()).toEqual(expect.objectContaining({ calorie: 1600 }));
    });

    it("should return undefined if startDayWithCalorieTargetLevel is undefined", () => {
      mockPreferences.get.mockReturnValue({ startDayWithCalorieTargetLevel: undefined });
      mockTargets.getAll.mockReturnValue([
        { calorie: 1400, serving: {} },
        { calorie: 1600, serving: {} },
        { calorie: 1800, serving: {} },
      ]);

      expect(userPreferences.getStartDayTarget()).toBeUndefined();
    });

  })
});