import { PreferenceLoader, Preferences, PreferenceSaver, ReadonlyPreferences } from "./preferences";

describe("ReadonlyPreferences", () => {
  let loader: PreferenceLoader;
  let preferences: ReadonlyPreferences;

  beforeEach(() => {
    loader = { load: jest.fn() };
    preferences = new ReadonlyPreferences(loader);
  });

  describe("getStartDayCalorieTarget", () => {
    it("returns default preference if loader returns undefined", () => {
      loader.load = jest.fn().mockReturnValue(undefined);
      const result = preferences.getStartDayCalorieTarget();
      expect(result).toEqual({
        enabled: false,
        level: 1600
      });
    });

    it("returns default preference if loader returns invalid preference", () => {
      loader.load = jest.fn().mockReturnValue({ startDayCalorieTarget: {} });
      const result = preferences.getStartDayCalorieTarget();
      expect(result).toEqual({
        enabled: false,
        level: 1600
      });
    });

    it("returns loaded preference if valid", () => {
      const validPreference = {
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        }
      };
      loader.load = jest.fn().mockReturnValue(validPreference);
      const result = preferences.getStartDayCalorieTarget();
      expect(result).toEqual(validPreference.startDayCalorieTarget);
    });
  });

  describe("getGender", () => {
    it("returns default gender if loader returns undefined", () => {
      loader.load = jest.fn().mockReturnValue(undefined);
      const result = preferences.getGender();
      expect(result).toEqual("man");
    });

    it("returns default gender if loader returns invalid preference", () => {
      loader.load = jest.fn().mockReturnValue({ startDayCalorieTarget: {} });
      const result = preferences.getGender();
      expect(result).toEqual("man");
    });

    it("returns loaded gender if valid", () => {
      const validPreference = {
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        },
        gender: "woman"
      };
      loader.load = jest.fn().mockReturnValue(validPreference);
      const result = preferences.getGender();
      expect(result).toEqual(validPreference.gender);
    });
  });
});

describe("Preferences", () => {
  let loader: PreferenceLoader;
  let saver: PreferenceSaver;
  let preferences: Preferences;

  beforeEach(() => {
    loader = { load: jest.fn() };
    saver = { save: jest.fn() };
    preferences = new Preferences(loader, saver);
  });

  describe("start day calorie target", () => {
    it("toggle to true if start day calorie target enabled is false", () => {
      const initialPreference = {
        startDayCalorieTarget: {
          enabled: false,
          level: 1600
        }
      };
      loader.load = jest.fn().mockReturnValue(initialPreference);
      preferences.toggleStartDayCalorieTarget();
      expect(saver.save).toHaveBeenCalledWith({
        startDayCalorieTarget: {
          enabled: true,
          level: 1600
        }
      });
    });

    it("toggles to false if start day calorie target enabled is true", () => {
      const initialPreference = {
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        }
      };
      loader.load = jest.fn().mockReturnValue(initialPreference);
      preferences.toggleStartDayCalorieTarget();
      expect(saver.save).toHaveBeenCalledWith({
        startDayCalorieTarget: {
          enabled: false,
          level: 1800
        }
      });
    });

    it("change start day calorie target level", () => {
      const initialPreference = {
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        }
      };
      loader.load = jest.fn().mockReturnValue(initialPreference);
      preferences.setStartDayCalorieTargetLevel(2000);
      expect(saver.save).toHaveBeenCalledWith({
        startDayCalorieTarget: {
          enabled: true,
          level: 2000
        }
      });
    });

    it("throws error if setting invalid start day calorie target level", () => {
      const initialPreference = {
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        }
      };
      loader.load = jest.fn().mockReturnValue(initialPreference);
      expect(() => preferences.setStartDayCalorieTargetLevel(1234)).toThrow("Invalid calorie target level: 1234");
      expect(saver.save).not.toHaveBeenCalled();
    });
  });

  describe("gender", () => {
    it("sets gender", () => {
      const initialPreference = {
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        },
        gender: "man"
      };
      loader.load = jest.fn().mockReturnValue(initialPreference);
      preferences.setGender("woman");
      expect(saver.save).toHaveBeenCalledWith({
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        },
        gender: "woman"
      });
    });
  });
});
