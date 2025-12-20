import { totalCaloriesSelector, targetSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";

export function shouldShow(state: RootState): boolean {
  const total = totalCaloriesSelector(state);
  const target = targetSelector(state);
  return (total / target.calorie) > 1.05;
}

export function isCritical(state: RootState): boolean {
  const total = totalCaloriesSelector(state);
  const target = targetSelector(state);
  return (total / target.calorie) > 1.10;
}

export function percentage(state: RootState): number {
  return isCritical(state) ? 10 : 5;
}