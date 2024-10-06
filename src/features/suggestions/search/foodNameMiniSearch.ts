import _, { Dictionary } from 'lodash';
import MiniSearch, { SearchOptions, SearchResult } from 'minisearch';
import { PredefinedSuggestion } from './PredefinedSuggestion';

function addIndexAsId(obj: object, i: number) { return _.set(obj, "id", _.toString(i)); }

function find(dict: Dictionary<PredefinedSuggestion>, res: SearchResult) {
  return dict[res.id];
}

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
    miniSearch,
    lookUp: _.partial(find, _.keyBy(list, 'id')),
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
  docs: { miniSearch: MiniSearch<PredefinedSuggestion>, lookUp: (res: SearchResult) => PredefinedSuggestion },
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