import _ from "lodash";
import { Form } from "react-bootstrap";
import { ServingSuggestion } from "../../features/suggestions";
import { FoodGroupLabelBadge } from "../badge";
import { BestChoiceLegend } from "../BestChoiceLegend";
import { BlueStar } from "../BlueStar";
import { Selectable } from "./Selectable";

const hasBestChoice = (suggestions: ServingSuggestion[]) => _.findIndex(suggestions, { 'bestChoice': true }) >= 0;

const ServingHint = (props: { suggestion: ServingSuggestion }) => {
  const { foodName, foodGroup, servingSize, bestChoice } = props.suggestion;
  return (
    <span>
      {bestChoice && <BlueStar />}
      <span className="font-weight-bolder">{foodName}</span>
      <FoodGroupLabelBadge foodGroup={foodGroup} />
      <span>{servingSize}</span>
    </span>
  )
}

interface Props {
  suggestions: (ServingSuggestion & Selectable)[];
  onSelected: (suggestion: ServingSuggestion, selected: boolean) => void;
  showSelect: boolean;
}

export const ServingSuggestionFormText = (props: Props) => (
  _.size(props.suggestions) === 0
    ? <div />
    :
    <Form.Text className="d-flex flex-column">
      <div>One serving is</div>

      <div className="d-flex flex-column flex-sm-row flex-wrap w-100">
        {props.suggestions.map((suggestion, index) => (
          <span key={index}>
            <ServingHint suggestion={suggestion} />&nbsp;
            {props.showSelect &&
              <Form.Check
                inline
                type="checkbox"
                aria-label="fill servings"
                checked={suggestion.selected}
                onChange={e => props.onSelected(suggestion, e.target.checked)}
              />
            }
          </span>
        ))}
      </div>

      <div style={{ maxWidth: "100px" }}>
        {hasBestChoice(props.suggestions) && <BestChoiceLegend />}
      </div>
    </Form.Text>
)
