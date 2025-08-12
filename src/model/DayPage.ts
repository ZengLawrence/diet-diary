import { Meal } from "./Food";
import { Target } from "./Target";


export interface DayPage {
  date: string;
  target: Target & { unlimitedFruit: boolean; };
  meals: Meal[];
}
