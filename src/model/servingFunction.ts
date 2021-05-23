import _ from "lodash";
import numeral from "numeral";
import { Meal, Serving } from "./Food";

function add(n1: number | undefined, n2: number | undefined) {
  return _.defaultTo(n1, 0) + _.defaultTo(n2, 0);
}

function addServings(s1: Serving, s2: Serving): Serving {
  return {
    vegetable: add(s1.vegetable, s2.vegetable),
    fruit: add(s1.fruit, s2.fruit),
    carbohydrate: add(s1.carbohydrate, s2.carbohydrate),
    proteinDiary: add(s1.proteinDiary, s2.proteinDiary),
    fat: add(s1.fat, s2.fat),
    sweet: add(s1.sweet, s2.sweet),
  };
}

function mealServings(meal: Meal) {
  return _.map(meal.foods, 'serving');
}

export function calcServingSummary(meal: Meal) {
  return _.reduce(mealServings(meal), addServings, {});
}

export function calcMealsServingSummary(meals: Meal[]) {
  return _.reduce(_.map(meals, calcServingSummary), addServings, {});
}

function minus(n1: number | undefined, n2: number | undefined) {
  return _.defaultTo(n1, 0) - _.defaultTo(n2, 0);
}

function minusServings(s1: Serving, s2: Serving): Serving {
  return {
    vegetable: minus(s1.vegetable, s2.vegetable),
    fruit: minus(s1.fruit, s2.fruit),
    carbohydrate: minus(s1.carbohydrate, s2.carbohydrate),
    proteinDiary: minus(s1.proteinDiary, s2.proteinDiary),
    fat: minus(s1.fat, s2.fat),
    sweet: minus(s1.sweet, s2.sweet),
  };
}

export function calcServingDifference(meals: Meal[], servingGoal: Serving) {
  return minusServings(calcMealsServingSummary(meals), servingGoal);
}

export function displayServingValue(val: number | undefined) {
  if (val) {
    return numeral(val).format('0[.][00]');
  } else {
    return val;
  }
}