import _ from "lodash";

interface SavedMeal {
  foods: { description: string }[];
}

function includesAllWords(meal: SavedMeal, searchTerm: string) {
  const foodDescriptions = _.map(meal.foods, f => _.lowerCase(f.description));
  const wordIncludedInFoodDescription = (word: string) => foodDescriptions.some(desc => desc.includes(word));
  return _.words(_.lowerCase(searchTerm)).every(wordIncludedInFoodDescription);
}

function byDescription<T extends SavedMeal>(meals: T[], searchTerm: string): T[] {
  return _.filter(meals, m => includesAllWords(m, searchTerm));
}

export const search = {
  byDescription
}