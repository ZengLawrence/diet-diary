import _ from "lodash";
import { Form } from "react-bootstrap";
import { PortionSuggestion } from "../../features/suggestions";
import { calcServingCalories } from "../../model/calorieFunction";
import { FoodGroupServingBadgePanel } from "../badge/FoodGroupServingBadgePanel";
import { CalorieSpan } from "../CalorieSpan";
import { Selectable } from "./Selectable";

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

interface Props {
  suggestions: (PortionSuggestion & Selectable)[];
  onSelected: (foodName: string, selected: boolean) => void;
}

export const PortionSuggestionFormText = (props: Props) => (
  <Form.Text className="d-flex flex-column">
    {_.size(props.suggestions) > 0 && <div>One portion is</div>}
    <div className="d-flex flex-column flex-wrap w-100">
      {props.suggestions.map((suggestion, index) => (
        <span key={index}>
          <PortionServingHint suggestion={suggestion} />&nbsp;
          <Form.Check 
          inline 
          type="checkbox" 
          aria-label="fill servings" 
          checked={suggestion.selected}
          onChange={e => props.onSelected(suggestion.foodName, e.target.checked)} 
          />
        </span>
      ))}
    </div>
  </Form.Text>
)
