import type { CustomTargets } from "./customTarget";
import { AbstractCustomTargetListener } from "./customTarget";
import type { DayPage } from "./DayPage";
import type { DiaryHistory } from "./diaryHistory";
import type { Preferences } from "./preferences";
import type { Target } from "./Target";
import { TargetPreferences } from "./TargetPreferences";
import type { Today } from "./today";

export class Diary {
  constructor(
    private readonly today: Today,
    private readonly diaryHistory: DiaryHistory,
    private readonly targetPreferences: TargetPreferences
  ) { }

  newDay(): DayPage {
    const { current, previous } = this.today.newDay(this.targetPreferences.getStartDayTarget());
    if (previous) this.diaryHistory.add(previous);
    return current;
  }

}
function listenToCustomTargetUpdate(customTargets: CustomTargets, today: Today) {
  customTargets.registerListener(new class extends AbstractCustomTargetListener {
    targetUpdated: (target: Target) => void = (target: Target) => {
      today.updateTargetIfSameCalorie(target);
    };
  });
}

export function createDiary(
  today: Today,
  diaryHistory: DiaryHistory,
  preferences: Preferences,
  customTargets: CustomTargets
): Diary {
  const targetPreferences = new TargetPreferences(preferences, customTargets);
  const diary = new Diary(today, diaryHistory, targetPreferences);
  listenToCustomTargetUpdate(customTargets, today);
  return diary;
}
