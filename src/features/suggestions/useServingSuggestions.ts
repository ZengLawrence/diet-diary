import _ from "lodash";
import { useState } from "react";

export interface ServingSuggestion {
  foodName: string;
  servingSize: string;
}

const SERVING_SUGGESTIONS: ServingSuggestion[] = [
  {
    foodName: "Cucumber",
    servingSize: "1 cup sliced / 1 medium"
  },
  {
    foodName: "Lettuce",
    servingSize: "2 cups chopped"
  },
]

const matchFoodName = (word: string) => _.filter(SERVING_SUGGESTIONS, { "foodName": word });

const findFoodServingSuggestions = (foodName: string) => _.flatMap(_.words(foodName), matchFoodName);

export const useServingSuggestions = () => {
  const [suggestions, setSuggestions] = useState([] as ServingSuggestion[]);
  const generateSuggestions = (foodName: string) => {
    setSuggestions(findFoodServingSuggestions(foodName));
  }

  return {
    suggestions,
    generateSuggestions
  };
}