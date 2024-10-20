import { totalCaloriesSelector, targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { hasATarget } from "../../model/Target";

export function shouldShow(state: RootState): boolean {
  const total = totalCaloriesSelector(state);
  const target = targetSelector(state);
  return hasATarget(target) && (total / target.calorie) > 1.05;
}
export function isCritical(state: RootState): boolean {
  const total = totalCaloriesSelector(state);
  const target = targetSelector(state);
  return hasATarget(target) && (total / target.calorie) > 1.10;
}
