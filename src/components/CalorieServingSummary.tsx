import _ from "lodash";
import { Col, Row } from "react-bootstrap";
import { calcMealCalories } from "../model/calorieFunction";
import { FoodGroup, Meal, Serving } from "../model/Food";
import { calcMealsServingSummary } from "../model/servingFunction";
import { backgroundColor } from "./backgroundColor";

const CalorieSummary = (props: { calories: number }) => (
  <Col xs={2} xl={1} className="d-flex flex-column justify-content-center border rounded bg-info text-white text-center">
    <div style={{ fontSize: '40px' }}>{props.calories}</div>
    <div>calories</div>
  </Col>
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
  <Col sm={3} lg={2} className="d-flex flex-column justify-content-end">
    <div className="text-center" style={{ fontSize: '32px' }}>{props.amount}</div>
    <FoodGroupLabel foodGroup={props.foodGroup} />
  </Col>
)

const ServingSummary = (props: { serving: Serving }) => (
  <Col>
    <Row>
      <ServingCell foodGroup="vegetable" amount={props.serving.vegetable} />
      <ServingCell foodGroup="fruit" amount={props.serving.fruit} />
      <ServingCell foodGroup="carbohydrate" amount={props.serving.carbohydrate} />
      <ServingCell foodGroup="protein" amount={props.serving.protein} />
      <ServingCell foodGroup="fat" amount={props.serving.fat} />
      <ServingCell foodGroup="sweet" amount={props.serving.sweet} />
    </Row>
  </Col>
)

function calcCaloriesSummary(meals: Meal[]) {
  return _.sum(_.map(meals, calcMealCalories));
}

export const CalorieServingSummary = (props: { meals: Meal[] }) => (
  <Row>
    <CalorieSummary calories={calcCaloriesSummary(props.meals)} />
    <ServingSummary serving={calcMealsServingSummary(props.meals)} />
  </Row>
)