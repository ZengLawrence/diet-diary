import { CustomTargets, AbstractCustomTargetListener } from "./customTarget";
import { DayPage } from "./DayPage";
import { DiaryHistory } from "./diaryHistory";
import { Target } from "./Target";
import { Today } from "./today";
import { TargetPreferences } from "./TargetPreferences";


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
  userPreferences: TargetPreferences,
  customTargets: CustomTargets
): Diary {
  const diary = new Diary(today, diaryHistory, userPreferences);
  listenToCustomTargetUpdate(customTargets, today);
  return diary;
}
