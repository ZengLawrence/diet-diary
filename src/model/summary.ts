import { DiaryHistory } from "./diaryHistory";
import { ReadonlyPreferences } from "./preferences";

export interface SummaryListener {
  onTotalWeightLossUpdated(): void;
}

export class Summary {
  private listeners: SummaryListener[] = [];

  constructor(
    private readonly diaryHistory: DiaryHistory,
    private readonly preferences: ReadonlyPreferences
  ) { 
    this.diaryHistory.registerListener({
      dayAdded: () => this.notifyTotalWeightLossUpdated()
    });
  }

  registerListener(listener: SummaryListener): void {
    this.listeners.push(listener);
  }

  unregisterListener(listener: SummaryListener): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyTotalWeightLossUpdated(): void {
    this.listeners.forEach(listener => listener.onTotalWeightLossUpdated());
  }

  totalWeightLoss(): number {
    return this.diaryHistory.totalWeightLoss(this.preferences.getGender());
  }
}