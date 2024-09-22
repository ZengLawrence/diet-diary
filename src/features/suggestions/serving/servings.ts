import _ from "lodash";
import { oneServingOf } from "../../../model/servingFunction";
import carbohydrate from "./carbohydrate-serving.json";
import fat from "./fat-serving.json";
import fruit from "./fruit-serving.json";
import proteinDiary from "./protein-diary-serving.json";
import { ServingSuggestion } from "./ServingSuggestion";
import sweet from "./sweet-serving.json";
import vegetable from "./vegetable-serving.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const vegetableServing = (serving: any) => ({ ...serving, foodGroup: "vegetable" });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fruitServing = (serving: any) => ({ ...serving, foodGroup: "fruit" });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const carbohydrateServing = (serving: any) => ({ ...serving, foodGroup: "carbohydrate" });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const proteinDiaryServing = (serving: any) => ({ ...serving, foodGroup: "proteinDiary" });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fatServing = (serving: any) => ({ ...serving, foodGroup: "fat" });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sweetServing = (serving: any) => ({ ...serving, foodGroup: "sweet" });

function toSuggestion({foodName, servingSize, foodGroup, bestChoice}: ServingSuggestion) {
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