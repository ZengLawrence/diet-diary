import _ from "lodash";
import { Food, Meal, newMeal } from "./Food";
import { getDefaultTarget, Target } from "./Target";
import { DiaryHistory } from "./diaryHistory";
import { UserPreferences } from "./userPreferences";
import { AbstractCustomTargetListener, CustomTargets } from "./customTarget";

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

function newDay(current: DayPage | undefined = undefined, startDayTarget: Target | undefined = undefined): DayPage {
  let target = current?.target || { unlimitedFruit: false, ...getDefaultTarget() };
  if (startDayTarget) {
    target = { ...target, ...startDayTarget };
  }
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

function removeLastEmptyMeal(day: DayPage): DayPage {
  const lastMeal = _.last(day.meals);
  if (lastMeal && lastMeal.foods.length === 0) {
    return {
      ...day,
      meals: day.meals.slice(0, day.meals.length - 1),
    }
  }
  return day;
}

function addSavedMeal(day: DayPage, foods: Food[]): DayPage {
  const _day = removeLastEmptyMeal(day);
  return {
    ..._day,
    meals: [..._day.meals, { ...newMeal(), foods }],
  }
}

function deleteMeal(day: DayPage, meal: Meal): DayPage {
  const meals = day.meals.filter(m => !_.isEqual(m, meal));
  return {
    ...day,
    meals,
  }
}

function addFood(day: DayPage, meal: Meal, food: Food): DayPage {
  const meals = day.meals.map(m => _.isEqual(m, meal) ? { ...m, foods: [...m.foods, food] } : m);
  return {
    ...day,
    meals,
  }
}

function updateFood(day: DayPage, meal: Meal, food: Food, replacedFood: Food): DayPage {
  const meals = day.meals.map(m => _.isEqual(m, meal) ? { ...m, foods: m.foods.map(f => _.isEqual(f, food) ? replacedFood : f) } : m);
  return {
    ...day,
    meals,
  }
}

function deleteFood(day: DayPage, meal: Meal, food: Food): DayPage {
  const meals = day.meals.map(m => _.isEqual(m, meal) ? { ...m, foods: m.foods.filter(f => !_.isEqual(f, food)) } : m);
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

export interface TodayLoader {
  load: (defaultFn: () => DayPage) => DayPage;
}

export interface TodaySaver {
  save: (day: DayPage) => void;
}

export class ReadOnlyToday {

  constructor(private loader: TodayLoader) { }

  protected _loadToday(): DayPage {
    return this.loader.load(() => newDay());
  }

  currentDay(): DayPage {
    return this._loadToday();
  }
}

abstract class AbstractToday extends ReadOnlyToday {
  constructor(loader: TodayLoader, private readonly saver: TodaySaver) {
    super(loader);
  }

  protected _saveToday(day: DayPage): void {
    this.saver.save(day);
  }

}

export class Diary {
  constructor(
    private readonly today: Today, 
    private readonly diaryHistory: DiaryHistory,
    private readonly userPreferences: UserPreferences,
    private readonly customTargets: CustomTargets,
  ) { }

  newDay(): DayPage {
    const {current, previous} = this.today.newDay(this.userPreferences.getStartDayTarget());
    if (previous) this.diaryHistory.add(previous);
    return current;
  }

  listenToCustomTargetUpdate(customTargets: CustomTargets) {
    const self = this;    
    customTargets.registerListener(new class extends AbstractCustomTargetListener {
      targetUpdated: (target: Target) => void = (target: Target) => {
        self.today.updateTargetIfSameCalorie(target);
      }
    });
  }
}

export class Today extends AbstractToday {

  constructor(loader: TodayLoader, saver: TodaySaver) {
    super(loader, saver);
  }

  newDay(startDayTarget: Target | undefined): {current: DayPage, previous: DayPage | undefined} {
    const currentDay = this._loadToday();
    if (isToday(currentDay.date)) {
      return { current: currentDay, previous: undefined };
    } else {
      const current = newDay(currentDay, startDayTarget);
      this._saveToday(current);
      return { current , previous: currentDay };
    }
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

  updateTargetIfSameCalorie(target: Target): DayPage {
    const currentDay = this._loadToday();
    if (currentDay.target.calorie === target.calorie) {
      const newDay = updateTarget(currentDay, target);
      this._saveToday(newDay);
      return newDay;
    } else {
      return currentDay;
    }
  } 

  toggleUnlimitedFruit(): DayPage {
    const newDay = toggleUnlimitedFruit(this._loadToday());
    this._saveToday(newDay);
    return newDay;
  }
}