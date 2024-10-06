import _ from 'lodash';
import MiniSearch, { SearchOptions, SearchResult } from 'minisearch';
import { PredefinedSuggestion } from './PredefinedSuggestion';

function addIndexAsId(obj: object, i: number) { return _.set(obj, "id", _.toString(i)); }

export function buildDocuments(list: PredefinedSuggestion[]) {
  const miniSearch = new MiniSearch({
    fields: ['foodName'],
    storeFields: [
      'foodName',
      'amount',
      'serving',
      'bestChoice',
    ]

  })

  miniSearch.addAll(_.map(list, addIndexAsId));
  return {
    miniSearch
  }
}

function perform(miniSearch: MiniSearch<PredefinedSuggestion>, foodName: string) {
  const options = { fuzzy: true };
  return miniSearch.search(foodName, options);
}

function toSuggestion(res: SearchResult): PredefinedSuggestion {
  return {
    foodName: _.get(res, 'foodName'),
    amount: _.get(res, 'amount'),
    serving: _.get(res, 'serving'),
    bestChoice: _.get(res, 'bestChoice'),
  }
}

export function search(
  docs: { miniSearch: MiniSearch<PredefinedSuggestion> },
  foodName: string
) {
  const { miniSearch } = docs;
  return _.map(perform(miniSearch, foodName), toSuggestion);
}

export function autoSuggest<T>(
  docs: { miniSearch: MiniSearch<T> },
  partialFoodName: string) {
  const { miniSearch } = docs;
  const options: SearchOptions = {
    fuzzy: true,
    combineWith: "AND",
  };
  return _.map(miniSearch.autoSuggest(partialFoodName, options), "suggestion");
}

export function addIfNotExist(docs: ReturnType<typeof buildDocuments>, food: { foodName: string; }) {
  const { miniSearch } = docs;
  const newFood = {
    id: food.foodName,
    ...food
  }
  miniSearch.add(newFood);
}