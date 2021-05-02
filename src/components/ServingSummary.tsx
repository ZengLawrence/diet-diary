import _ from "lodash";
import { Fragment } from "react";
import { calcServingCalories, Serving } from "../model/Food";
import { FoodGroupServingBadge } from "./FoodGroupBadge";

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

export const ServingSummary = (props: { servings: Serving[]; }) => {
  const { servings } = props;
  const servingSummary = _.reduce(servings, addServings, {});
  const totalCalories = _.sum(_.map(servings, calcServingCalories));
  return (
    <Fragment>
      <div className="mr-1">{totalCalories} Cal.</div>
      <FoodGroupServingBadge foodGroup="vegetable" serving={servingSummary} />
      <FoodGroupServingBadge foodGroup="fruit" serving={servingSummary} />
      <FoodGroupServingBadge foodGroup="carbohydrate" serving={servingSummary} />
      <FoodGroupServingBadge foodGroup="protein" serving={servingSummary} />
      <FoodGroupServingBadge foodGroup="fat" serving={servingSummary} />
      <FoodGroupServingBadge foodGroup="sweet" serving={servingSummary} />
    </Fragment>
  );
};
