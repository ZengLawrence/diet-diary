import _ from "lodash";
import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { FoodGroupServingBadgePanel } from "../badge/FoodGroupServingBadgePanel";
import { PortionSuggestion } from "../../features/suggestions/PortionSuggestion";

const ServingHintsText = (props: { suggestions: PortionSuggestion[]; }) => {
  const appendComma = (i: number) => i < (_.size(props.suggestions) - 1);
  return (
    <Fragment>
      {props.suggestions.map(({ foodName, portionSize, serving }, index) => (
        <div key={index}>
          <span className="font-weight-bolder">{foodName}</span><span>&nbsp;{portionSize}</span><FoodGroupServingBadgePanel serving={serving} />{appendComma(index) && ","}&nbsp;
        </div>
      ))}
    </Fragment>
  );
};

export const PortionSuggestionFormText = (props: { suggestions: PortionSuggestion[]; }) => (
  <Form.Text className="d-flex flex-column">
    {_.size(props.suggestions) > 0 && <div>One portion is</div>}
    <div className="d-flex flex-column flex-sm-row flex-wrap w-100">
      <ServingHintsText suggestions={props.suggestions} />
    </div>
  </Form.Text>
);
