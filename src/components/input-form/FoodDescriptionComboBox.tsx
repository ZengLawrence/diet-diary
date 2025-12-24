import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import type { RefObject} from "react";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type { Suggestion } from "../../features/suggestions/Suggestion";
import type { Serving } from "../../model/Food";
import { calcServingCalories } from "../../model/calorieFunction";
import { BestChoiceLegend } from "../BestChoiceLegend";
import { BlueStar } from "../BlueStar";
import { VariantSecondary } from "../ButtonVariant";
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
  onExpand?: () => void;
}

function useClickOutside(ref: RefObject<HTMLDivElement | null>, handler: () => void) {
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
  const [showDropDown, setShowDropDown] = useState(false);
  const { inputRef, setInputFocus } = useFocus();

  const handleChange = (e: { target: { value: string; }; }) => {
    props.updateFoodDescription(e.target.value);
    setShowDropDown(true);
  }

  const handleItemClick = (suggestion: Suggestion) => {
    props.updateFoodDescriptionServing(foodDescription(suggestion), suggestion.serving, suggestion.bestChoice);
    setInputFocus();
  }

  useEffect(() => {
    if (invalid) {
      const hideDropdown = () => Promise.resolve(setShowDropDown(false)); 
      void hideDropdown(); 
    }
  }, [invalid]);

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setShowDropDown(false));

  const handleEscapeKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setShowDropDown(false);
      event.preventDefault(); // Prevent default behavior if needed
    }
  };

  /* eslint-disable react-x/no-array-index-key */
  return (
    <Dropdown ref={ref} show={showDropDown} onSelect={() => setShowDropDown(false)}>

      <Form.Label htmlFor="inputFoodDescription">Food description</Form.Label>
      <InputGroup hasValidation>
        <Form.Control
          id="inputFoodDescription"
          type="text"
          placeholder="Broccoli steamed 1 cup"
          value={props.foodName}
          onChange={handleChange}
          onKeyDown={handleEscapeKeyDown}
          required
          isInvalid={props.invalid}
          autoFocus
          ref={inputRef}
        />
        <Button
          variant={VariantSecondary}
          onClick={props.onExpand}
          className="d-sm-none"
        >
          <FontAwesomeIcon icon={faRightToBracket} />
        </Button>
        <Form.Control.Feedback type="invalid">
          Please enter food description.
        </Form.Control.Feedback>
      </InputGroup>

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
  /* eslint-enable react-x/no-array-index-key */
}
