import ServingCell from "../../features/summary/ServingCell";
import { Serving } from "../../model/Food";

export const ServingSummary = (props: { serving: Serving; isPercent?: boolean }) => (
  <div className="d-flex justify-content-between flex-fill flex-wrap">
    <ServingCell foodGroup="vegetable" amount={props.serving.vegetable} percentAmount={props.isPercent} />
    <ServingCell foodGroup="fruit" amount={props.serving.fruit} percentAmount={props.isPercent} />
    <ServingCell foodGroup="carbohydrate" amount={props.serving.carbohydrate} percentAmount={props.isPercent} />
    <ServingCell foodGroup="proteinDiary" amount={props.serving.proteinDiary} percentAmount={props.isPercent} />
    <ServingCell foodGroup="fat" amount={props.serving.fat} percentAmount={props.isPercent} />
    <ServingCell foodGroup="sweet" amount={props.serving.sweet} percentAmount={props.isPercent} />
  </div>
)