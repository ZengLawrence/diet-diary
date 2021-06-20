import _ from "lodash";
import { Form } from "react-bootstrap";
import { PortionSuggestion } from "../../features/suggestions";
import { calcServingCalories } from "../../model/calorieFunction";
import { FoodGroupServingBadgePanel } from "../badge/FoodGroupServingBadgePanel";
import { CalorieSpan } from "../CalorieSpan";

const PortionServingHint = (props: { suggestion: PortionSuggestion }) => {
  const { foodName, portionSize, serving } = props.suggestion;

  return (
    <span>
      <span className="font-weight-bolder">{foodName}</span>&nbsp;
      <span>{portionSize}</span>
      <FoodGroupServingBadgePanel serving={serving} />
      (<CalorieSpan value={calcServingCalories(serving)} />)
    </span>
  )
}

export const PortionSuggestionFormText = (props: { suggestions: PortionSuggestion[]; }) => (
  <Form.Text className="d-flex flex-column">
    {_.size(props.suggestions) > 0 && <div>One portion is</div>}
    <div className="d-flex flex-column flex-wrap w-100">
      {props.suggestions.map((suggestion, index) => (
        <span key={index}>
          <PortionServingHint suggestion={suggestion} />&nbsp;
          <Form.Check inline type="checkbox" aria-label="fill servings" onChange={e => console.log(e.target.checked)} />
        </span>
      ))}
    </div>
  </Form.Text>
)
