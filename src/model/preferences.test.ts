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
      loader.load.mockReturnValue({ startDayWithCalorieLevel: 1600 });

      expect(prefs.get()).toStrictEqual({ startDayWithCalorieLevel: 1600 });
    });

    it("should return default preference if loader returns undefined", () => {
      expect(prefs.get()).toStrictEqual({ startDayWithCalorieLevel: undefined });
    });
  });

  describe("set", () => {
    it("should save with given value", () => {
      const preference = { startDayWithCalorieLevel: 2000 };
      prefs.set(preference);
      expect(saver.save).toHaveBeenCalledWith(preference);
    });
  });

});