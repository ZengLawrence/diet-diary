import { DiaryHistory } from "./diaryHistory";
import { ReadonlyPreferences } from "./preferences";

export class Summary {
  constructor(
    private readonly diaryHistory: DiaryHistory,
    private readonly preferences: ReadonlyPreferences
  ) { }

  totalWeightLoss(): number {
    return this.diaryHistory.totalWeightLoss(this.preferences.getGender());
  }
}