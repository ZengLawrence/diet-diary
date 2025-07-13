import { PreferenceLoader, Preferences, PreferenceSaver } from "./preferences";

describe("Preferences class", () => {
  const loader = {
    load: jest.fn(),
  };
  const saver = {
    save: jest.fn(),
  }
  const prefs = new Preferences(loader, saver);

  describe("get", () => {
    it("should get from loader", () => {
      loader.load.mockReturnValue({ startDayWithCalorieLevel: 1600 });

      expect(prefs.get()).toStrictEqual({ startDayWithCalorieLevel: 1600 });
    });
  });

});