import _ from "lodash";
import { RefObject, useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Suggestion } from "../../features/suggestions/Suggestion";
import { Serving } from "../../model/Food";
import { calcServingCalories } from "../../model/calorieFunction";
import { BestChoiceLegend } from "../BestChoiceLegend";
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

function hasBestChoice(suggestions: Suggestion[]) {
  return _.findIndex(suggestions, { 'bestChoice': true }) >= 0;
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

// set focus solution from https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering
const useFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setInputFocus = () => { inputRef?.current?.focus() }

  return { inputRef, setInputFocus };
}

const MenuFooter = () => (
  <Dropdown.ItemText className="d-inline-flex">
    <BestChoiceLegend /><span />
  </Dropdown.ItemText>
);

interface Props {
  foodName: string;
  suggestions: Suggestion[];
  invalid?: boolean;
  updateFoodDescription: (desc: string) => void;
  updateFoodDescriptionServing: (desc: string, serving?: Serving, bestChoice?: boolean) => void;
}

function useClickOutside(ref: RefObject<HTMLDivElement>, handler: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}

export const FoodDescriptionComboBox = (props: Props) => {

  const { invalid } = props;
  const [toggle, setToggle] = useState(false);
  const { inputRef, setInputFocus } = useFocus();

  const handleChange = (e: { target: { value: string; }; }) => {
    props.updateFoodDescription(e.target.value);
    setToggle(true);
  }

  const handleItemClick = (suggestion: Suggestion) => {
    props.updateFoodDescriptionServing(foodDescription(suggestion), suggestion.serving, suggestion.bestChoice);
    setInputFocus();
  }

  useEffect(() => {
    if (invalid) { setToggle(false); }
  }, [invalid]);

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setToggle(false));

  return (
    <Dropdown ref={ref} show={toggle} onSelect={() => setToggle(false)}>

      <Form.Label htmlFor="inputFoodDescription">Food description</Form.Label>
      <Form.Control
        id="inputFoodDescription"
        type="text"
        placeholder="Broccoli steamed 1 cup"
        value={props.foodName}
        onChange={handleChange}
        required
        isInvalid={props.invalid}
        autoFocus
        ref={inputRef}
      />
      <Form.Control.Feedback type="invalid">
        Please enter food description.
      </Form.Control.Feedback>

      <Dropdown.Menu>
        {props.suggestions.map((suggestion, index) => (
          <Dropdown.Item
            key={index}
            as="div"
            onClick={() => handleItemClick(suggestion)}
            className="text-wrap"
          >
            <ItemText suggestion={suggestion} />
          </Dropdown.Item>
        ))}

        {hasBestChoice(props.suggestions) && <MenuFooter />}

      </Dropdown.Menu>
    </Dropdown>
  );
}
