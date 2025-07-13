import { Preferences } from "./preferences";

describe("Preferences class", () => {
  const loader = {
    load: jest.fn(),
  };
  const saver = {
    save: jest.fn(),
  }
  const prefs = new Preferences(loader, saver);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("get", () => {
    it("should get from loader", () => {
      loader.load.mockReturnValue({ startDayWithCalorieTargetLevel: 1600 });

      expect(prefs.get()).toStrictEqual({ startDayWithCalorieTargetLevel: 1600 });
    });

    it("should return default preference if loader returns undefined", () => {
      expect(prefs.get()).toStrictEqual({ startDayWithCalorieTargetLevel: undefined });
    });

    it("should return default preference if loader returns invalid calorie target level", () => {
      loader.load.mockReturnValue({ startDayWithCalorieTargetLevel: 1000 });

      expect(prefs.get()).toStrictEqual({ startDayWithCalorieTargetLevel: undefined });
    });
  });

  describe("set", () => {
    it("should save with given value", () => {
      const preference = { startDayWithCalorieTargetLevel: 2000 };
      prefs.set(preference);
      expect(saver.save).toHaveBeenCalledWith(preference);
    });

    it("should save with given value if startDayWithCalorieTargetLevel is undefined", () => {
      const preference = { startDayWithCalorieTargetLevel: undefined };
      prefs.set(preference);
      expect(saver.save).toHaveBeenCalledWith(preference);
    });

    it("should not save if calorie target level is invalid", () => {
      prefs.set({startDayWithCalorieTargetLevel: 1000});
      expect(saver.save).not.toHaveBeenCalled();
    });
  });

});