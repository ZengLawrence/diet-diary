import _ from "lodash";
import fruit from "./fruit-serving.json";
import vegetable from "./vegetable-serving.json";
import carbohydrate from "./carbohydrate-serving.json";
import proteinDiary from "./protein-diary-serving.json";
import fat from "./fat-serving.json";
import sweet from "./sweet-serving.json";
import { ServingSuggestion } from "./ServingSuggestion";
import { oneServingOf } from "../../../model/servingFunction";

const vegetableServing = (serving: any) => ({ ...serving, foodGroup: "vegetable" });
const fruitServing = (serving: any) => ({ ...serving, foodGroup: "fruit" });
const carbohydrateServing = (serving: any) => ({ ...serving, foodGroup: "carbohydrate" });
const proteinDiaryServing = (serving: any) => ({ ...serving, foodGroup: "proteinDiary" });
const fatServing = (serving: any) => ({ ...serving, foodGroup: "fat" });
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