import { add } from "lodash";
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

function deleteMeal(day: DayPage, meal: Meal): DayPage {
  const meals = day.meals.filter(m => m !== meal);
  return {
    ...day,
    meals,
  }
}

function addFood(day: DayPage, meal: Meal, food: Food): DayPage {
  const meals = day.meals.map(m => m === meal ? { ...m, foods: [...m.foods, food] } : m);
  return {
    ...day,
    meals,
  }
}

function updateFood(day: DayPage, meal: Meal, food: Food, replacedFood: Food): DayPage {
  const meals = day.meals.map(m => m === meal ? { ...m, foods: m.foods.map(f => f === food ? replacedFood : f) } : m);
  return {
    ...day,
    meals,
  }
}

function deleteFood(day: DayPage, meal: Meal, food: Food): DayPage {
  const meals = day.meals.map(m => m === meal ? { ...m, foods: m.foods.filter(f => f !== food) } : m);
  return {
    ...day,
    meals,
  }
}

export const mutation = {
  newDay,
  addMeal,
  addSavedMeal,
  deleteMeal,
  addFood,
  updateFood,
  deleteFood,
}

export default mutation;