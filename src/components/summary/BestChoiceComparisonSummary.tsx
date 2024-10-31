import _ from "lodash";
import { Serving } from "../../model/Food";
import { BestChoiceComparisonChart } from "./BestChoiceComparisonChart";

interface Props {
  bestChoice: Serving;
  others: Serving;
}

const ServingComparison = (props: { bestChoice: number; others: number }) => (
  <BestChoiceComparisonChart {...props} />
)

export const BestChoiceComparisonSummary = (props: Props) => (
  <div className="d-flex justify-content-between flex-fill flex-wrap">
    <ServingComparison bestChoice={_.defaultTo(props.bestChoice.vegetable, 0)} others={_.defaultTo(props.others.vegetable, 0)} />
    <ServingComparison bestChoice={_.defaultTo(props.bestChoice.fruit, 0)} others={_.defaultTo(props.others.fruit, 0)} />
    <ServingComparison bestChoice={_.defaultTo(props.bestChoice.carbohydrate, 0)} others={_.defaultTo(props.others.carbohydrate, 0)} />
    <ServingComparison bestChoice={_.defaultTo(props.bestChoice.proteinDiary, 0)} others={_.defaultTo(props.others.proteinDiary, 0)} />
    <ServingComparison bestChoice={_.defaultTo(props.bestChoice.fat, 0)} others={_.defaultTo(props.others.fat, 0)} />
    <ServingComparison bestChoice={_.defaultTo(props.bestChoice.sweet, 0)} others={_.defaultTo(props.others.sweet, 0)} />
  </div>
)