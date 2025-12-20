import type { Meal } from "./Food";
import type { Target } from "./Target";


export interface DayPage {
  date: string;
  target: Target & { unlimitedFruit: boolean; };
  meals: Meal[];
}
