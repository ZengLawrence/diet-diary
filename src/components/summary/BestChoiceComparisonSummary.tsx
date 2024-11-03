import _ from "lodash";
import { FoodGroup, Serving } from "../../model/Food";
import { BestChoiceComparisonChart } from "./BestChoiceComparisonChart";
import { FoodGroupLabel } from "./FoodGroupLabel";

interface Props {
  bestChoice: Serving;
  others: Serving;
}

const ServingComparison = (props: { foodGroup: FoodGroup; bestChoice: number; others: number }) => (
  <div className="d-flex flex-column align-items-center">
    <BestChoiceComparisonChart bestChoice={props.bestChoice} others={props.others} />
    <FoodGroupLabel foodGroup={props.foodGroup} />
  </div>
)

export const BestChoiceComparisonSummary = (props: Props) => (
  <div className="d-flex justify-content-between flex-fill flex-wrap">
    <ServingComparison foodGroup="vegetable" bestChoice={_.defaultTo(props.bestChoice.vegetable, 0)} others={_.defaultTo(props.others.vegetable, 0)} />
    <ServingComparison foodGroup="fruit" bestChoice={_.defaultTo(props.bestChoice.fruit, 0)} others={_.defaultTo(props.others.fruit, 0)} />
    <ServingComparison foodGroup="carbohydrate" bestChoice={_.defaultTo(props.bestChoice.carbohydrate, 0)} others={_.defaultTo(props.others.carbohydrate, 0)} />
    <ServingComparison foodGroup="proteinDiary" bestChoice={_.defaultTo(props.bestChoice.proteinDiary, 0)} others={_.defaultTo(props.others.proteinDiary, 0)} />
    <ServingComparison foodGroup="fat" bestChoice={_.defaultTo(props.bestChoice.fat, 0)} others={_.defaultTo(props.others.fat, 0)} />
    <ServingComparison foodGroup="sweet" bestChoice={_.defaultTo(props.bestChoice.sweet, 0)} others={_.defaultTo(props.others.sweet, 0)} />
  </div>
)