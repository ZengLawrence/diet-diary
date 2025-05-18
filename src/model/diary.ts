import { Meal, newMeal } from "./Food";
import { getDefaultTarget, Target } from "./Target";

export interface DayPage {
  date: string,
  target: Target & { unlimitedFruit: boolean },
  meals: Meal[],
}

function today() {
  return new Date().toLocaleDateString();
}

function isToday(date: string): boolean {
  return date === today();
}

export const validation = {
  isToday,
}

function newDay(): DayPage {
  return {
    date: today(),
    target: {
      unlimitedFruit: false,
      ...getDefaultTarget(),
    },
    meals: [newMeal()],
  }
}

function addMeal(day: DayPage): DayPage {
  return {
    ...day,
    meals: [...day.meals, newMeal()],
  }
}

export const mutation = {
  newDay,
  addMeal,
}

export default mutation;