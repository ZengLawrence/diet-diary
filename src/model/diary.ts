import { Food, Meal, newMeal } from "./Food";
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

function removeFirstEmptyMeal(day: DayPage): DayPage {
  const firstMeal = day.meals[0];
  if (firstMeal && firstMeal.foods.length === 0) {
    return {
      ...day,
      meals: day.meals.slice(1),
    }
  }
  return day;
}

function addSavedMeal(day: DayPage, foods: Food[]): DayPage {
  const _day = removeFirstEmptyMeal(day);
  return {
    ..._day,
    meals: [..._day.meals, { ...newMeal(), foods }],
  }
}

export const mutation = {
  newDay,
  addMeal,
  addSavedMeal
}

export default mutation;