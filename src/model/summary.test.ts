import { DiaryHistory } from "./diaryHistory";
import { ReadonlyPreferences } from "./preferences";
import { Summary } from "./summary";

describe("Summary class", () => {

  it("should calculate total weight loss from diary history", () => {
    // Arrange
    const mockDiaryHistory = Object.create(DiaryHistory.prototype);
    mockDiaryHistory.totalWeightLoss = jest.fn().mockReturnValue(5);
    const mockPreferences = Object.create(ReadonlyPreferences.prototype);
    mockPreferences.getGender = jest.fn().mockReturnValue("woman");
    const summary = new Summary(mockDiaryHistory, mockPreferences);

    // Act
    const result = summary.totalWeightLoss();

    // Assert
    expect(result).toBe(5);
  });
});
