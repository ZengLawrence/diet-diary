import { CustomTargets, AbstractCustomTargetListener } from "./customTarget";
import { DayPage } from "./DayPage";
import { DiaryHistory } from "./diaryHistory";
import { Target } from "./Target";
import { Today } from "./today";
import { UserPreferences } from "./userPreferences";


export class Diary {
  constructor(
    private readonly today: Today,
    private readonly diaryHistory: DiaryHistory,
    private readonly userPreferences: UserPreferences
  ) { }

  newDay(): DayPage {
    const { current, previous } = this.today.newDay(this.userPreferences.getStartDayTarget());
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
  userPreferences: UserPreferences,
  customTargets: CustomTargets
): Diary {
  const diary = new Diary(today, diaryHistory, userPreferences);
  listenToCustomTargetUpdate(customTargets, today);
  return diary;
}
