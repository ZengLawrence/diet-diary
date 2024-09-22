import _ from "lodash";
import { oneServingOf } from "../../../model/servingFunction";
import carbohydrate from "./carbohydrate-serving.json";
import fat from "./fat-serving.json";
import fruit from "./fruit-serving.json";
import proteinDiary from "./protein-diary-serving.json";
import { ServingSuggestion } from "./ServingSuggestion";
import sweet from "./sweet-serving.json";
import vegetable from "./vegetable-serving.json";

interface SingleServingData {
  foodName: string;
  servingSize: string;
  bestChoice?: boolean;
}

function vegetableServing(serving: SingleServingData): ServingSuggestion {
  return ({ ...serving, foodGroup: "vegetable" });
}

function fruitServing(serving: SingleServingData) {
  return ({ ...serving, foodGroup: "fruit" });
}

function carbohydrateServing(serving: SingleServingData) {
  return ({ ...serving, foodGroup: "carbohydrate" });
}

function proteinDiaryServing(serving: SingleServingData) {
  return ({ ...serving, foodGroup: "proteinDiary" });
}

function fatServing(serving: SingleServingData) {
  return ({ ...serving, foodGroup: "fat" });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sweetServing(serving: any) {
  return { ...serving, foodGroup: "sweet" };
}

function toSuggestion({ foodName, servingSize, foodGroup, bestChoice }: ServingSuggestion) {
  return {
    foodName,
    amount: servingSize,
    serving: oneServingOf(foodGroup),
    bestChoice,
  }
}

export default _.concat(
  _.map(vegetable.servings, vegetableServing),
  _.map(fruit.servings, fruitServing),
  _.map(carbohydrate.servings, carbohydrateServing),
  _.map(proteinDiary.servings, proteinDiaryServing),
  _.map(fat.servings, fatServing),
  _.map(sweet.servings, sweetServing),
).map(toSuggestion);