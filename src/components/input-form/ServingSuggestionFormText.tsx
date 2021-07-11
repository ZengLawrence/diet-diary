import _ from "lodash";
import { Form } from "react-bootstrap";
import { ServingSuggestion } from "../../features/suggestions";
import { FoodGroupLabelBadge } from "../badge";
import { BestChoiceLegend } from "../BestChoiceLegend";
import { BlueStar } from "../BlueStar";
import { Selectable } from "../../model/Selectable";

const hasBestChoice = (suggestions: ServingSuggestion[]) => _.findIndex(suggestions, { 'bestChoice': true }) >= 0;

const ServingHint = (props: { suggestion: ServingSuggestion }) => {
  const { foodName, servingSize, bestChoice } = props.suggestion;
  return (
    <span>
      {bestChoice && <BlueStar />}
      <span className="font-weight-bolder">{foodName}</span>&nbsp;
      <span>{servingSize}</span>
    </span>
  )
}

interface Props {
  suggestions: (ServingSuggestion & Selectable)[];
  onSelected: (suggestion: ServingSuggestion, selected: boolean, fillFoodName: boolean) => void;
  showSelect: boolean;
}

export const ServingSuggestionFormText = (props: Props) => (
  _.size(props.suggestions) === 0
    ? <div />
    :
    <Form.Text className="d-flex flex-column">
      <div>One serving is</div>

      <div className="d-flex flex-column flex-wrap w-100">
        {props.suggestions.map((suggestion, index) => (
          <div key={index} className="d-inline-flex mr-1">
            {props.showSelect &&
              <Form.Check
                type="checkbox"
                aria-label="fill food name and servings"
                checked={suggestion.selected}
                onChange={e => props.onSelected(suggestion, e.target.checked, true)}
              />
            }
            <ServingHint suggestion={suggestion} />&nbsp;
            {props.showSelect &&
              <Form.Check
                type="checkbox"
                aria-label="fill servings"
                checked={suggestion.selected}
                onChange={e => props.onSelected(suggestion, e.target.checked, false)}
              />
            }
            <FoodGroupLabelBadge foodGroup={suggestion.foodGroup} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: "100px" }}>
        {hasBestChoice(props.suggestions) && <BestChoiceLegend />}
      </div>
    </Form.Text>
)
