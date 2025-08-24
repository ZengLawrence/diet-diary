import { DiaryHistory } from "./diaryHistory";
import { ReadonlyPreferences } from "./preferences";
import { Summary } from "./summary";

describe("Summary class", () => {
  const mockDiaryHistory = Object.create(DiaryHistory.prototype);
  const mockPreferences = Object.create(ReadonlyPreferences.prototype);
  const summary = new Summary(mockDiaryHistory, mockPreferences);

  it("should calculate total weight loss from diary history", () => {
    mockDiaryHistory.totalWeightLoss = jest.fn().mockReturnValue(5);
    mockPreferences.getGender = jest.fn().mockReturnValue("woman");

    const result = summary.totalWeightLoss();

    expect(result).toBe(5);
  });
});
