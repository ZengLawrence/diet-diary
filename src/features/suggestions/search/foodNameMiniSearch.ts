import _ from 'lodash';
import MiniSearch, { SearchOptions, SearchResult } from 'minisearch';
import { PredefinedSuggestion } from './PredefinedSuggestion';

function addIndexAsId(obj: object, i: number) { return _.set(obj, "id", i); }

function find(list: PredefinedSuggestion[], res: SearchResult) {
  return list[res.id];
}

export function buildDocuments(list: PredefinedSuggestion[]) {
  const miniSearch = new MiniSearch({
    fields: ['foodName']
  })

  miniSearch.addAll(_.map(list, addIndexAsId));
  return {
    miniSearch,
    lookUp: _.partial(find, list),
  }
}

function perform(miniSearch: MiniSearch<PredefinedSuggestion>, foodName: string) {
  const options = { fuzzy: true };
  return miniSearch.search(foodName, options);
}

export function search(
  docs: { miniSearch: MiniSearch<PredefinedSuggestion>, lookUp: (res: SearchResult) => PredefinedSuggestion },
  foodName: string
) {
  const { miniSearch, lookUp } = docs;
  return _.map(perform(miniSearch, foodName), lookUp);
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