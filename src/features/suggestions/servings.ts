import _ from "lodash";
import { servings as fruitServings } from "./fruit-serving.json";
import { servings as vegetableServings } from "./vegetable-serving.json";

const vegetableServing = (serving: any) => ({ ...serving, foodGroup: "vegetable" });
const fruitServing = (serving: any) => ({ ...serving, foodGroup: "fruit" });

export default _.concat(
  _.map(vegetableServings, vegetableServing),
  _.map(fruitServings, fruitServing),
);