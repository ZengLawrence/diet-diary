import _ from "lodash";
import { Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import { ServingSuggestion } from "../../features/suggestions/ServingSuggestion";
import { calcFoodCalories, displayCalorieValue } from "../../model/calorieFunction";
import { Food } from "../../model/Food";
import { FoodGroupLabelBadge } from "../badge";
import { BestChoiceLegend } from "../BestChoiceLegend";
import { BlueStar } from "../BlueStar";
import { ServingInputControl } from "./ServingInputControl";
import { useFoodInputFormStateReducer } from "./useFoodInputFormStateReducer";

const hasBestChoice = (suggestions: ServingSuggestion[]) => _.findIndex(suggestions, { 'bestChoice': true }) >= 0;

const ServingHintsText = (props: { suggestions: ServingSuggestion[] }) => {
  const appendComma = (i: number) => i < (_.size(props.suggestions) - 1);
  return (
    <Fragment>
      {props.suggestions.map(({ foodName, foodGroup, servingSize, bestChoice }, index) => (
        <div key={index}>
          {bestChoice && <BlueStar />}<span className="font-weight-bolder">{foodName}</span><FoodGroupLabelBadge foodGroup={foodGroup} /><span>{servingSize}{appendComma(index) && ","}&nbsp;</span>
        </div>
      ))}
    </Fragment>
  )
}

interface Props {
  food: Food;
  buttonLabel: string;
  onAddFood: (food: Food) => void;
  onCancel: () => void
}

export const FoodInputForm = (props: Props) => {
  const { food, error, suggestions, updateFoodName, updateServing, handleSubmit } = useFoodInputFormStateReducer(props.food, props.onAddFood);

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
          placeholder="Broccoli 1 cup, apple 1 small, bread 1 slice, turkey white meat 3 oz, olive oil 1 tsp, maple syrup 1 1/2 tbsp..."
          isInvalid={error.foodName}
          onChange={e => updateFoodName(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter food name.
        </Form.Control.Feedback>
        <Form.Text className="d-flex flex-column">
          {_.size(suggestions) > 0 && <div>One Serving is</div>}
          <div className="d-flex flex-column flex-sm-row flex-wrap w-100">
            <ServingHintsText suggestions={suggestions} />
          </div>
          <div style={{ maxWidth: "100px" }}>
            {hasBestChoice(suggestions) && <BestChoiceLegend />}
          </div>
        </Form.Text>
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