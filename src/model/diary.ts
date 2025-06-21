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

function newDay(current: DayPage | undefined = undefined): DayPage {
  const target = current?.target || { unlimitedFruit: false, ...getDefaultTarget() };
  return {
    date: today(),
    target,
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

function updateTarget(day: DayPage, target: Target): DayPage {
  return {
    ...day,
    target: {
      ...day.target,
      ...target,
    },
  }
}

function toggleUnlimitedFruit(day: DayPage): DayPage {
  return {
    ...day,
    target: {
      ...day.target,
      unlimitedFruit: !day.target.unlimitedFruit,
    },
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
  updateTarget,
  toggleUnlimitedFruit,
}

export default mutation;

export interface TodayLoader {
  load: (defaultFn: () => DayPage) => DayPage;
}

export interface TodaySaver {
  save: (day: DayPage) => void;
}

export class Today {
  private loader: TodayLoader;
  private saver: TodaySaver;

  constructor(loader: TodayLoader, saver: TodaySaver) {
    this.loader = loader;
    this.saver = saver;
  }

  _loadToday(): DayPage {
    return this.loader.load(() => newDay());
  }

  _saveToday(day: DayPage): void {
    this.saver.save(day);
  }

  newDay(): DayPage {
    const day = newDay(this._loadToday());
    this._saveToday(day);
    return day;
  }

  addMeal(): DayPage {
    const newDay = addMeal(this._loadToday());
    this._saveToday(newDay);
    return newDay;
  }

  addSavedMeal(foods: Food[]): DayPage {
    const newDay = addSavedMeal(this._loadToday(), foods);
    this._saveToday(newDay);
    return newDay;
  }

  deleteMeal(meal: Meal): DayPage {
    const newDay = deleteMeal(this._loadToday(), meal);
    this._saveToday(newDay);
    return newDay;
  }

  addFood(meal: Meal, food: Food): DayPage {
    const newDay = addFood(this._loadToday(), meal, food);
    this._saveToday(newDay);
    return newDay;
  }

  updateFood(meal: Meal, food: Food, replacedFood: Food): DayPage {
    const newDay = updateFood(this._loadToday(), meal, food, replacedFood);
    this._saveToday(newDay);
    return newDay;
  }

  deleteFood(meal: Meal, food: Food): DayPage {
    const newDay = deleteFood(this._loadToday(), meal, food);
    this._saveToday(newDay);
    return newDay;
  }

  updateTarget(target: Target): DayPage {
    const newDay = updateTarget(this._loadToday(), target);
    this._saveToday(newDay);
    return newDay;
  }

  toggleUnlimitedFruit(): DayPage {
    const newDay = toggleUnlimitedFruit(this._loadToday());
    this._saveToday(newDay);
    return newDay;
  }
}