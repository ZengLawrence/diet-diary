import { Button, Form } from "react-bootstrap";
import { calcFoodCalories, displayCalorieValue } from "../../model/calorieFunction";
import { Food } from "../../model/Food";
import { PortionSuggestionFormText } from "./PortionSuggestionFormText";
import { ServingInputControl } from "./ServingInputControl";
import { ServingSuggestionFormText } from "./ServingSuggestionFormText";
import { useFoodInputFormStateReducer } from "./useFoodInputFormStateReducer";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Fragment } from "react";
import { PortionSuggestion, ServingSuggestion } from "../../features/suggestions";

export type ButtonLabel = "Add" | "Update";

interface Props {
  food: Food;
  buttonLabel: ButtonLabel;
  onSaveFood: (food: Food) => void;
  onCancel: () => void
}

const FoodNameInput = (props: {
  foodName: string;
  suggestions: { servingSuggestions: ServingSuggestion[]; portionSuggestions: PortionSuggestion[] };
  invalid?: boolean;
  updateFoodName: (name: string) => void;
}) => (
  <Fragment>
    <Form.Label htmlFor="inputFoodName" srOnly>Food name</Form.Label>
    <Combobox className="w-100">
      <ComboboxInput
        id="inputFoodName"
        type="text"
        value={props.foodName}
        required
        placeholder="Broccoli steamed 1 cup"
        onChange={e => props.updateFoodName(e.target.value)}
        aria-labelledby="inputFoodName"
        className={props.invalid ? "form-control is-invalid" : "form-control"}
      />
      <ComboboxPopover>
        <ComboboxList aria-labelledby="inputFoodName">
          {props.suggestions.servingSuggestions.map((suggestion, index) => (
            <ComboboxOption
              key={"s-" + index}
              value={suggestion.foodName}
              onClick={() => props.updateFoodName(suggestion.foodName)}
            />
          ))}
          {props.suggestions.portionSuggestions.map((suggestion, index) => (
            <ComboboxOption
              key={"p-" + index}
              value={suggestion.foodName}
              onClick={() => props.updateFoodName(suggestion.foodName)}
            />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
    <Form.Control.Feedback type="invalid">
      Please enter food name.
    </Form.Control.Feedback>
  </Fragment>
)

export const FoodInputForm = (props: Props) => {
  const [state, fns] = useFoodInputFormStateReducer(props.food, props.onSaveFood);
  const { food, error, suggestions } = state;
  const { updateFoodName, updateServing, handleSubmit, handleSelectPortionSuggestion, handleSelectServingSuggestion } = fns;

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className="border p-1"
    >
      <Form.Group as={Form.Row} className="ml-1 mr-1">
        <FoodNameInput
          foodName={food.name}
          suggestions={suggestions}
          invalid={error.foodName}
          updateFoodName={updateFoodName}
        />
        <div className="d-flex flex-column w-100">
          <ServingSuggestionFormText
            suggestions={suggestions.servingSuggestions}
            onSelected={handleSelectServingSuggestion}
            showSelect={props.buttonLabel === "Add"}
          />
          <PortionSuggestionFormText
            suggestions={suggestions.portionSuggestions}
            onSelected={handleSelectPortionSuggestion}
            showSelect={props.buttonLabel === "Add"}
          />
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Servings (Calories: {displayCalorieValue(calcFoodCalories(food))})</Form.Label>
        <Form.Group as={Form.Row} controlId="formServings" className="d-flex justify-content-between">
          <ServingInputControl foodGroup="vegetable" serving={food.serving} isInvalid={error.vegetable} onChange={updateServing} />
          <ServingInputControl foodGroup="fruit" serving={food.serving} isInvalid={error.fruit} onChange={updateServing} />
          <ServingInputControl foodGroup="carbohydrate" serving={food.serving} isInvalid={error.carbohydrate} onChange={updateServing} />
          <ServingInputControl foodGroup="proteinDiary" serving={food.serving} isInvalid={error.proteinDiary} onChange={updateServing} />
          <ServingInputControl foodGroup="fat" serving={food.serving} isInvalid={error.fat} onChange={updateServing} />
          <ServingInputControl foodGroup="sweet" serving={food.serving} isInvalid={error.sweet} onChange={updateServing} />
        </Form.Group>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button className="mr-1 order-sm-1" variant="outline-secondary" onClick={props.onCancel}>Cancel</Button>
        <Button className="mr-1 order-sm-0" type="submit" variant="outline-primary">{props.buttonLabel}</Button>
      </div>
    </Form>
  )
}