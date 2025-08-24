import { DiaryHistory, DiaryHistoryListener } from "./diaryHistory";
import { ReadonlyPreferences } from "./preferences";
import { Summary } from "./summary";

describe("Summary class", () => {
  const mockDiaryHistory = Object.create(DiaryHistory.prototype);
  mockDiaryHistory.registerListener = jest.fn();
  const mockPreferences = Object.create(ReadonlyPreferences.prototype);
  const summary = new Summary(mockDiaryHistory, mockPreferences);

  it("should calculate total weight loss from diary history", () => {
    mockDiaryHistory.totalWeightLoss = jest.fn().mockReturnValue(5);
    mockPreferences.getGender = jest.fn().mockReturnValue("woman");

    const result = summary.totalWeightLoss();

    expect(result).toBe(5);
  });

  it("should notify listeners when total weight loss is updated", () => {
    const listener = {
      onTotalWeightLossUpdated: jest.fn(),
    };
    let historyListener: DiaryHistoryListener | undefined;
    mockDiaryHistory.registerListener = jest.fn((listener) => {
      historyListener = listener;
    });
    // registering history listener in constructor
    const summary = new Summary(mockDiaryHistory, mockPreferences);

    summary.registerListener(listener);
    if (historyListener) {
      historyListener.dayAdded();
    } else {
      throw new Error("DiaryHistoryListener was not registered");
    }

    expect(listener.onTotalWeightLossUpdated).toHaveBeenCalled();
  });
});
