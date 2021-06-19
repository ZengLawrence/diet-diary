import _ from "lodash";
import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { PortionSuggestion } from "../../features/suggestions";
import { calcServingCalories } from "../../model/calorieFunction";
import { FoodGroupServingBadgePanel } from "../badge/FoodGroupServingBadgePanel";
import { CalorieSpan } from "../CalorieSpan";

const ServingHintsText = (props: { suggestions: PortionSuggestion[]; }) => (
  <Fragment>
    {props.suggestions.map(({ foodName, portionSize, serving }, index) => (
      <div key={index}>
        <span className="font-weight-bolder">{foodName}</span>&nbsp;
        <span>{portionSize}</span>
        <FoodGroupServingBadgePanel serving={serving} />
          (<CalorieSpan value={calcServingCalories(serving)} />)
      </div>
    ))}
  </Fragment>
)

export const PortionSuggestionFormText = (props: { suggestions: PortionSuggestion[]; }) => (
  <Form.Text className="d-flex flex-column">
    {_.size(props.suggestions) > 0 && <div>One portion is</div>}
    <div className="d-flex flex-column flex-wrap w-100">
      <ServingHintsText suggestions={props.suggestions} />
    </div>
  </Form.Text>
)
