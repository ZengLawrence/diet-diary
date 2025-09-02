import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { mock, MockProxy } from "jest-mock-extended";
import { DiaryHistory, DiaryHistoryListener } from "./diaryHistory";
import { ReadonlyPreferences } from "./preferences";
import { Summary } from "./summary";

describe("Summary class", () => {
  let mockDiaryHistory: MockProxy<DiaryHistory>;
  let mockPreferences: MockProxy<ReadonlyPreferences>;
  let summary: Summary;

  beforeEach(() => {
    mockDiaryHistory = mock<DiaryHistory>();
    mockPreferences = mock<ReadonlyPreferences>();
    summary = new Summary(mockDiaryHistory, mockPreferences);
  });

  it("should calculate total weight loss from diary history", () => {
    mockDiaryHistory.totalWeightLoss.mockReturnValue(5);
    mockPreferences.getGender.mockReturnValue("woman");

    const result = summary.totalWeightLoss();

    expect(result).toBe(5);
  });

  it("should notify listeners when total weight loss is updated", () => {
    const listener = {
      onTotalWeightLossUpdated: jest.fn(),
    };
    let historyListener: DiaryHistoryListener | undefined;
    mockDiaryHistory.registerListener.mockImplementation((listener) => {
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
