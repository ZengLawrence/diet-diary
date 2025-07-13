import { CustomTargets } from "./customTarget";
import { Preferences } from "./preferences";
import { UserPreferences } from "./userPreferences";

describe("UserPreferences class", () => {
  describe("getStartDayTarget", () => {
    it("should return undefined if there is no preference", () => {
      const mockPreferences = Object.create(Preferences.prototype);
      const mockTargets = Object.create(CustomTargets.prototype);
      const userPreferences = new UserPreferences(mockPreferences, mockTargets);
      expect(userPreferences.getStartDayTarget()).toBeUndefined();
    })
  })
});