import _ from "lodash";
import { Form } from "react-bootstrap";
import { ServingSuggestion } from "../../features/suggestions";
import { FoodGroupLabelBadge } from "../badge";
import { BestChoiceLegend } from "../BestChoiceLegend";
import { BlueStar } from "../BlueStar";

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

export const ServingSuggestionFormText = (props: { suggestions: ServingSuggestion[]; }) => (
  <Form.Text className="d-flex flex-column">
    {_.size(props.suggestions) > 0 && <div>One serving is</div>}

    <div className="d-flex flex-column flex-sm-row flex-wrap w-100">
      {props.suggestions.map((suggestion, index) => (
        <span key={index}>
          <ServingHint suggestion={suggestion} />&nbsp;
          <Form.Check inline type="checkbox" aria-label="fill servings" onChange={e => console.log(e.target.checked)} />
        </span>
      ))}
    </div>

    <div style={{ maxWidth: "100px" }}>
      {hasBestChoice(props.suggestions) && <BestChoiceLegend />}
    </div>
  </Form.Text>
)
