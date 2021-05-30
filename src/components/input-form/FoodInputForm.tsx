import _ from "lodash";
import React, { Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import { ServingSuggestion, useServingSuggestions } from "../../features/suggestions/useServingSuggestions";
import { calcFoodCalories, displayCalorieValue } from "../../model/calorieFunction";
import { Food } from "../../model/Food";
import { ServingInputControl } from "./ServingInputControl";
import { useInputFormStateFunction } from "./useInputFormStateFunction";

const ServingHintsText = (props: { suggestions: ServingSuggestion[] }) => (
  <Fragment>
    {props.suggestions.map(({ foodName, servingSize }, index) => (
      <div key={index}>
        {index > 0 && ', '}<span className="mr-1 font-weight-bolder">{foodName}</span><span>{servingSize}</span>
      </div>
    ))}
  </Fragment>
)

interface Props {
  food: Food;
  buttonLabel: string;
  onAddFood: (food: Food) => void;
  onCancel: () => void
}

export const FoodInputForm = (props: Props) => {
  const { food, error, handleNameChange, handleServingChange, handleSubmit } = useInputFormStateFunction(props.food, props.onAddFood);
  const { suggestions, generateSuggestions } = useServingSuggestions();

  const handleFoodNameChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const foodName = event.target.value;
    handleNameChange(foodName);

    const debouncedGenerateSuggestions = _.debounce(() => generateSuggestions(foodName), 500);
    debouncedGenerateSuggestions();
  }

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className="border p-1"
    >

      <Form.Group as={Form.Row} className="ml-1 mr-1">
        <Form.Label htmlFor="inputFoodName" srOnly>Food name</Form.Label>
        <Form.Control
          id="inputFoodName"
          type="text"
          value={food.name}
          required
          placeholder="Broccoli, apple, bread, turkey, olive oil, cake..."
          isInvalid={error.foodName}
          onChange={handleFoodNameChangeEvent}
        />
        <Form.Control.Feedback type="invalid">
          Please enter food name.
        </Form.Control.Feedback>
        <Form.Text className="d-flex">
          {_.size(suggestions) > 0 && <div>One Serving is&nbsp;</div>}
          <ServingHintsText suggestions={suggestions} />
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Servings (Calories: {displayCalorieValue(calcFoodCalories(food))})</Form.Label>
        <Form.Group as={Form.Row} controlId="formServings" className="d-flex justify-content-between">
          <ServingInputControl foodGroup="vegetable" serving={food.serving} isInvalid={error.vegetable} onChange={handleServingChange} />
          <ServingInputControl foodGroup="fruit" serving={food.serving} isInvalid={error.fruit} onChange={handleServingChange} />
          <ServingInputControl foodGroup="carbohydrate" serving={food.serving} isInvalid={error.carbohydrate} onChange={handleServingChange} />
          <ServingInputControl foodGroup="proteinDiary" serving={food.serving} isInvalid={error.proteinDiary} onChange={handleServingChange} />
          <ServingInputControl foodGroup="fat" serving={food.serving} isInvalid={error.fat} onChange={handleServingChange} />
          <ServingInputControl foodGroup="sweet" serving={food.serving} isInvalid={error.sweet} onChange={handleServingChange} />
        </Form.Group>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button className="mr-1 order-sm-1" variant="outline-secondary" onClick={props.onCancel}>Cancel</Button>
        <Button className="mr-1 order-sm-0" type="submit" variant="outline-primary">{props.buttonLabel}</Button>
      </div>
    </Form>
  )
}