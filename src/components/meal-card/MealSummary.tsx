import { Fragment } from "react";
import { Meal } from "../../model/Food";
import { calcServingSummary } from "../../model/servingFunction";
import { calcMealCalories } from "../../model/calorieFunction";
import { FoodGroupServingBadge } from "../FoodGroupBadge";

export const MealSummary = (props: { meal: Meal; }) => {
  const { meal } = props;
  const servingSummary = calcServingSummary(meal);
  const totalCalories = calcMealCalories(meal);

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
