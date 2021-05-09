import _ from "lodash";
import { calcMealCalories } from "../../model/calorieFunction";
import { FoodGroup, Meal, Serving } from "../../model/Food";
import { calcMealsServingSummary } from "../../model/servingFunction";
import { backgroundColor } from "../backgroundColor";

const CalorieSummary = (props: { calories: number }) => (
  <div className="d-flex flex-column justify-content-center border rounded bg-info text-white text-center">
    <div style={{ fontSize: '40px' }}>{props.calories}</div>
    <div>calories</div>
  </div>
)

const FoodGroupLabel = (props: { foodGroup: FoodGroup }) => {
  const { foodGroup } = props;
  const style: React.CSSProperties = {
    backgroundColor: backgroundColor(foodGroup),
  };
  return (
    <div className="text-center text-white font-weight-bold" style={style}>{foodGroup}</div>
  )
}

const ServingCell = (props: { foodGroup: FoodGroup; amount?: number }) => (
  <div className="d-flex flex-column justify-content-end m-1">
    <div className="text-center" style={{ fontSize: '32px', minWidth: '110px' }}>{props.amount}</div>
    <FoodGroupLabel foodGroup={props.foodGroup} />
  </div>
)

const ServingSummary = (props: { serving: Serving }) => (
  <div className="d-flex justify-content-between flex-fill flex-wrap">
    <ServingCell foodGroup="vegetable" amount={props.serving.vegetable} />
    <ServingCell foodGroup="fruit" amount={props.serving.fruit} />
    <ServingCell foodGroup="carbohydrate" amount={props.serving.carbohydrate} />
    <ServingCell foodGroup="protein" amount={props.serving.protein} />
    <ServingCell foodGroup="fat" amount={props.serving.fat} />
    <ServingCell foodGroup="sweet" amount={props.serving.sweet} />
  </div>
)

function calcCaloriesSummary(meals: Meal[]) {
  return _.sum(_.map(meals, calcMealCalories));
}

export const CalorieServingSummary = (props: { meals: Meal[] }) => (
  <div className="d-flex">
    <CalorieSummary calories={calcCaloriesSummary(props.meals)} />
    <ServingSummary serving={calcMealsServingSummary(props.meals)} />
  </div>
)