import { PreferenceLoader, Preferences, PreferenceSaver } from "./preferences";

describe("Preferences class", () => {

  describe("get", () => {
    it("should get from loader", () => {
      const loader = {
        load: jest.fn(),
      };
      const saver = {
        save: jest.fn(),
      }
      loader.load.mockReturnValue({ startDayWithCalorieLevel: 1600 });
      const prefs = new Preferences(loader, saver);
      expect(prefs.get()).toStrictEqual({ startDayWithCalorieLevel: 1600 });
    });
  });
  
});