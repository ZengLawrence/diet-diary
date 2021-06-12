import _ from "lodash";
import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { ServingSuggestion } from "../../features/suggestions/ServingSuggestion";
import { FoodGroupLabelBadge } from "../badge";
import { BestChoiceLegend } from "../BestChoiceLegend";
import { BlueStar } from "../BlueStar";

const hasBestChoice = (suggestions: ServingSuggestion[]) => _.findIndex(suggestions, { 'bestChoice': true }) >= 0;

const ServingHintsText = (props: { suggestions: ServingSuggestion[]; }) => {
  const appendComma = (i: number) => i < (_.size(props.suggestions) - 1);
  return (
    <Fragment>
      {props.suggestions.map(({ foodName, foodGroup, servingSize, bestChoice }, index) => (
        <div key={index}>
          {bestChoice && <BlueStar />}<span className="font-weight-bolder">{foodName}</span><FoodGroupLabelBadge foodGroup={foodGroup} /><span>{servingSize}{appendComma(index) && ","}&nbsp;</span>
        </div>
      ))}
    </Fragment>
  );
};

export const ServingSuggestionFormText = (props: { suggestions: ServingSuggestion[]; }) => (
  <Form.Text className="d-flex flex-column">
    {_.size(props.suggestions) > 0 && <div>One Serving is</div>}
    <div className="d-flex flex-column flex-sm-row flex-wrap w-100">
      <ServingHintsText suggestions={props.suggestions} />
    </div>
    <div style={{ maxWidth: "100px" }}>
      {hasBestChoice(props.suggestions) && <BestChoiceLegend />}
    </div>
  </Form.Text>
);
