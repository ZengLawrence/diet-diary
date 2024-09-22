import _ from "lodash";
import { oneServingOf } from "../../../model/servingFunction";
import carbohydrate from "./carbohydrate-serving.json";
import fat from "./fat-serving.json";
import fruit from "./fruit-serving.json";
import proteinDiary from "./protein-diary-serving.json";
import { ServingSuggestion } from "./ServingSuggestion";
import sweet from "./sweet-serving.json";
import vegetable from "./vegetable-serving.json";

const vegetableServing = (serving: typeof vegetable.servings) => ({ ...serving, foodGroup: "vegetable" });

const fruitServing = (serving: typeof fruit.servings) => ({ ...serving, foodGroup: "fruit" });

const carbohydrateServing = (serving: typeof carbohydrate.servings) => ({ ...serving, foodGroup: "carbohydrate" });

const proteinDiaryServing = (serving: typeof proteinDiary.servings) => ({ ...serving, foodGroup: "proteinDiary" });

const fatServing = (serving: typeof fat.servings) => ({ ...serving, foodGroup: "fat" });

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