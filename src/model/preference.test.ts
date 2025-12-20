import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { Preference, PreferenceLoader, PreferenceSaver} from "./preferences";
import { Preferences, ReadonlyPreferences } from "./preferences";
import { mock } from "jest-mock-extended";

const DEFAULT_PREFERENCE: Preference = {
  startDayCalorieTarget: {
    enabled: false,
    level: 1600
  },
  gender: "man"
};

describe("ReadonlyPreferences", () => {
  const loader = mock<PreferenceLoader>();
  let preferences: ReadonlyPreferences;

  beforeEach(() => {
    preferences = new ReadonlyPreferences(loader);
  });

  describe("getStartDayCalorieTarget", () => {
    it("returns default preference if loader returns undefined", () => {
      loader.load.mockReturnValue(undefined);
      const result = preferences.getStartDayCalorieTarget();
      expect(result).toEqual({
        enabled: false,
        level: 1600
      });
    });

    it("returns default preference if loader returns invalid preference", () => {
      loader.load.mockReturnValue({});
      const result = preferences.getStartDayCalorieTarget();
      expect(result).toEqual({
        enabled: false,
        level: 1600
      });
    });

    it("returns loaded preference if valid", () => {
      const validPreference = {
        ...DEFAULT_PREFERENCE,
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        }
      };
      loader.load.mockReturnValue(validPreference);
      const result = preferences.getStartDayCalorieTarget();
      expect(result).toEqual(validPreference.startDayCalorieTarget);
    });
  });

  describe("getGender", () => {
    it("returns default gender if loader returns undefined", () => {
      loader.load.mockReturnValue(undefined);
      const result = preferences.getGender();
      expect(result).toEqual("man");
    });

    it("returns default gender if loader returns invalid preference", () => {
      loader.load.mockReturnValue({ startDayCalorieTarget: {} } as Preference);
      const result = preferences.getGender();
      expect(result).toEqual("man");
    });

    it("returns loaded gender if valid", () => {
      const validPreference: Preference = {
        ...DEFAULT_PREFERENCE,
        gender: "woman"
      };
      loader.load.mockReturnValue(validPreference);
      const result = preferences.getGender();
      expect(result).toEqual(validPreference.gender);
    });
  });
});

describe("Preferences", () => {
  const loader = mock<PreferenceLoader>();
  let saver: PreferenceSaver;
  let preferences: Preferences;

  beforeEach(() => {
    saver = { save: jest.fn() };
    preferences = new Preferences(loader, saver);
  });

  describe("start day calorie target", () => {
    it("toggle to true if start day calorie target enabled is false", () => {
      const initialPreference = {
        ...DEFAULT_PREFERENCE,
        startDayCalorieTarget: {
          enabled: false,
          level: 1600
        },
      };
      loader.load.mockReturnValue(initialPreference);
      preferences.toggleStartDayCalorieTarget();
      expect(saver.save).toHaveBeenCalledWith(expect.objectContaining({
        startDayCalorieTarget: {
          enabled: true,
          level: 1600
        }
      }));
    });

    it("toggles to false if start day calorie target enabled is true", () => {
      const initialPreference = {
        ...DEFAULT_PREFERENCE,
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        },
      };
      loader.load.mockReturnValue(initialPreference);
      preferences.toggleStartDayCalorieTarget();
      expect(saver.save).toHaveBeenCalledWith(expect.objectContaining({
        startDayCalorieTarget: {
          enabled: false,
          level: 1800
        }
      }));
    });

    it("change start day calorie target level", () => {
      const initialPreference = {
        ...DEFAULT_PREFERENCE,
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        },
      };
      loader.load.mockReturnValue(initialPreference);
      preferences.setStartDayCalorieTargetLevel(2000);
      expect(saver.save).toHaveBeenCalledWith(expect.objectContaining({
        startDayCalorieTarget: {
          enabled: true,
          level: 2000
        }
      }));
    });

    it("throws error if setting invalid start day calorie target level", () => {
      const initialPreference = {
        startDayCalorieTarget: {
          enabled: true,
          level: 1800
        }
      };
      loader.load.mockReturnValue(initialPreference);
      expect(() => preferences.setStartDayCalorieTargetLevel(1234)).toThrow("Invalid calorie target level: 1234");
      expect(saver.save).not.toHaveBeenCalled();
    });
  });

  describe("gender", () => {
    it("sets gender", () => {
      const initialPreference: Preference = {
        ...DEFAULT_PREFERENCE,
        gender: "man"
      };
      loader.load.mockReturnValue(initialPreference);
      preferences.setGender("woman");
      expect(saver.save).toHaveBeenCalledWith(expect.objectContaining({
        gender: "woman"
      }));
    });
  });
});
