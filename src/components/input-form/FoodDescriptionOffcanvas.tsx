import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Suggestion } from "../../features/suggestions";
import { calcServingCalories } from "../../model/calorieFunction";
import { Serving } from "../../model/Food";
import { BlueStar } from "../BlueStar";
import { CalorieSpan } from "../CalorieSpan";
import { FoodGroupServingBadgePanel } from "../panels/FoodGroupServingBadgePanel";

function foodDescription(suggestion: Suggestion) {
  if (suggestion.amount) {
    return suggestion.foodName + " " + suggestion.amount;
  } else {
    return suggestion.foodName;
  }
}

const ItemText = (props: {
  suggestion: Suggestion;
}) => {
  const { bestChoice, serving } = props.suggestion;
  return (
    <div>
      {bestChoice && <BlueStar />}
      {foodDescription(props.suggestion)}
      {serving &&
        <span className="ms-1">
          <FoodGroupServingBadgePanel serving={serving} />
          <CalorieSpan value={calcServingCalories(serving)} />
        </span>
      }
    </div>
  );
}

interface Props {
  show: boolean;
  onHide: () => void;
  foodName: string;
  invalid?: boolean;
  foodNameChanged: (name: string) => void;
  suggestions: Suggestion[];
  updateFoodDescriptionServing: (desc: string, serving?: Serving, bestChoice?: boolean) => void;
}

export const FoodDescriptionOffcanvas = (props: Props) => {
  const handleItemClick = (suggestion: Suggestion) => {
    props.updateFoodDescriptionServing(foodDescription(suggestion), suggestion.serving, suggestion.bestChoice);
    props.onHide();
  }

  return (
    <Offcanvas show={props.show} onHide={props.onHide} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Food Description</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form className="mb-2">
          <InputGroup hasValidation>
            <Form.Control
              id="inputFoodDescription"
              type="text"
              placeholder="Broccoli steamed 1 cup"
              value={props.foodName}
              onChange={(e) => props.foodNameChanged(e.target.value)}
              required
              isInvalid={props.invalid}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              Please enter food description.
            </Form.Control.Feedback>
          </InputGroup>
        </Form>
        <ListGroup>
          {props.suggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handleItemClick(suggestion)}
              className="text-wrap"
            >
              <ItemText suggestion={suggestion} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
}