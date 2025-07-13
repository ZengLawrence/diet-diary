import { CustomTargets } from "./customTarget";
import { Preferences } from "./preferences";
import { UserPreferences } from "./userPreferences";

describe("UserPreferences class", () => {
  const mockPreferences = Object.create(Preferences.prototype);
  const mockTargets = Object.create(CustomTargets.prototype);
  const userPreferences = new UserPreferences(mockPreferences, mockTargets);

  describe("getStartDayTarget", () => {
    it("should return undefined if there is no preference", () => {
      expect(userPreferences.getStartDayTarget()).toBeUndefined();
    })
  })
});