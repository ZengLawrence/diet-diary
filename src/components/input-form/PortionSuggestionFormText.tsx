import _ from "lodash";
import { Form } from "react-bootstrap";
import { PortionSuggestion } from "../../features/suggestions";
import { calcServingCalories } from "../../model/calorieFunction";
import { FoodGroupServingBadgePanel } from "../panels/FoodGroupServingBadgePanel";
import { CalorieSpan } from "../CalorieSpan";
import { Selectable } from "../../model/Selectable";

const PortionServingHint = (props: { suggestion: PortionSuggestion }) => {
  const { foodName, portionSize } = props.suggestion;

  return (
    <div>
      <span className="font-weight-bolder">{foodName}</span>&nbsp;
      <span>{portionSize}</span>
    </div>
  )
}

interface Props {
  suggestions: (PortionSuggestion & Selectable)[];
  onSelected: (suggestion: PortionSuggestion, selected: boolean) => void;
  showSelect: boolean;
}

export const PortionSuggestionFormText = (props: Props) => (
  _.size(props.suggestions) === 0
    ? <div />
    :
    <Form.Text className="d-flex flex-column">
      <div>One portion is</div>
      <div className="d-flex flex-column flex-wrap w-100">
        {props.suggestions.map((suggestion, index) => (
          <div key={index} className="d-inline-flex">
            <PortionServingHint suggestion={suggestion} />&nbsp;
            {props.showSelect &&
              <Form.Check
                type="checkbox"
                aria-label="fill servings"
                checked={suggestion.selected}
                onChange={e => props.onSelected(suggestion, e.target.checked)}
              />
            }
            <FoodGroupServingBadgePanel serving={suggestion.serving} />
            <CalorieSpan value={calcServingCalories(suggestion.serving)} />
          </div>
        ))}
      </div>
    </Form.Text>
)
