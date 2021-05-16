import _ from "lodash";
import { Serving, Meal } from "./Food";

function add(n1: number | undefined, n2: number | undefined) {
  return _.defaultTo(n1, 0) + _.defaultTo(n2, 0);
}

function addServings(s1: Serving, s2: Serving): Serving {
  return {
    vegetable: add(s1.vegetable, s2.vegetable),
    fruit: add(s1.fruit, s2.fruit),
    carbohydrate: add(s1.carbohydrate, s2.carbohydrate),
    protein: add(s1.protein, s2.protein),
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
    protein: minus(s1.protein, s2.protein),
    fat: minus(s1.fat, s2.fat),
    sweet: minus(s1.sweet, s2.sweet),
  };
}

export function calcServingDifference(meals: Meal[], servingGoal: Serving) {
  return minusServings(calcMealsServingSummary(meals), servingGoal);
}
