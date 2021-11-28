import _ from "lodash";
import numeral from "numeral";
import { Food, FoodGroup, Meal, Serving } from "./Food";

function _add(n1: number | undefined, n2: number | undefined) {
  return _.defaultTo(n1, 0) + _.defaultTo(n2, 0);
}

export function add(s1: Serving, s2: Serving): Serving {
  return {
    vegetable: _add(s1.vegetable, s2.vegetable),
    fruit: _add(s1.fruit, s2.fruit),
    carbohydrate: _add(s1.carbohydrate, s2.carbohydrate),
    proteinDiary: _add(s1.proteinDiary, s2.proteinDiary),
    fat: _add(s1.fat, s2.fat),
    sweet: _add(s1.sweet, s2.sweet),
  };
}

export function calcFoodsServingSummary(foods: Food[]) {
  return _.reduce(_.map(foods, "serving"), add, {
    vegetable: 0,
    fruit: 0,
    carbohydrate: 0,
    proteinDiary: 0,
    fat: 0,
    sweet: 0,
  });
}

export function calcServingSummary(meal: Meal) {
  return calcFoodsServingSummary(meal.foods);
}

export function calcMealsServingSummary(meals: Meal[]) {
  return _.reduce(_.map(meals, calcServingSummary), add, {});
}

function _minus(n1: number | undefined, n2: number | undefined) {
  return _.defaultTo(n1, 0) - _.defaultTo(n2, 0);
}

export function minus(s1: Serving, s2: Serving): Serving {
  return {
    vegetable: _minus(s1.vegetable, s2.vegetable),
    fruit: _minus(s1.fruit, s2.fruit),
    carbohydrate: _minus(s1.carbohydrate, s2.carbohydrate),
    proteinDiary: _minus(s1.proteinDiary, s2.proteinDiary),
    fat: _minus(s1.fat, s2.fat),
    sweet: _minus(s1.sweet, s2.sweet),
  };
}

export function calcServingDifference(meals: Meal[], servingGoal: Serving) {
  return minus(calcMealsServingSummary(meals), servingGoal);
}

export function displayServingValue(val: number | undefined) {
  if (val) {
    return numeral(val).format('0[.][00]');
  } else {
    return val;
  }
}

export function positiveServing(serving: Serving) {
  return _.pickBy(serving, val => _.defaultTo(val, 0) > 0);
}

export function oneServingOf(foodGroup: FoodGroup) {
  return _.set({} as Serving, foodGroup, 1);
}

export function multiply(s: Serving, multiplier: number): Serving {
  return _.fromPairs(_.toPairs(s).map(([key, val]) => [key, val * multiplier]));
}
