import _ from "lodash";
import { searchFoodServingSize } from "./serving/search";
import { ServingSuggestion } from "./ServingSuggestion";

const ingredientName = (phrase: string) => _.map(_.split(phrase, /\d/, 1), _.trim);

const ingredients = (foodDescription: string) => _.flatMap(_.split(foodDescription, ","), ingredientName);

function findServingSuggestions(foodDescription: string) {
  const _ingredients = ingredients(foodDescription);
  const lastIngredient = (index: number) => (index === _.size(_ingredients) - 1);
  const maxItems = (items: any[], index: number) => _.slice(items, 0, lastIngredient(index) ? 5 : 2);

  const results = _.map(_ingredients, ingredient => searchFoodServingSize(ingredient));
  return _.uniq(_.flatMap(_.map(results, maxItems)));
}

export const generateServingSuggestions = (descRef: React.MutableRefObject<String>, callback: (suggestions: ServingSuggestion[]) => void) => 
  callback(findServingSuggestions(descRef.current + ""));
