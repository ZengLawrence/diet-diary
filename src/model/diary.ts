import { AbstractCustomTargetListener, CustomTargets } from "./customTarget";
import { DayPage } from "./DayPage";
import { DiaryHistory } from "./diaryHistory";
import { Preferences } from "./preferences";
import { Target } from "./Target";
import { TargetPreferences } from "./TargetPreferences";
import { Today } from "./today";

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
