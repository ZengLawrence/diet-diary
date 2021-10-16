import _ from "lodash";
import { servings as fruitServings } from "./fruit-serving.json";
import { servings as vegetableServings } from "./vegetable-serving.json";
import { servings as carbohydrateServings } from "./carbohydrate-serving.json";
import { servings as proteinDiaryServings } from "./protein-diary-serving.json";
import { servings as fatServings } from "./fat-serving.json";
import { servings as sweetServings } from "./sweet-serving.json";
import { ServingSuggestion } from "..";
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
  _.map(vegetableServings, vegetableServing),
  _.map(fruitServings, fruitServing),
  _.map(carbohydrateServings, carbohydrateServing),
  _.map(proteinDiaryServings, proteinDiaryServing),
  _.map(fatServings, fatServing),
  _.map(sweetServings, sweetServing),
).map(toSuggestion);