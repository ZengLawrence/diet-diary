import _ from "lodash";
import MiniSearch, { SearchOptions } from "minisearch";
import portions from "../portion/portions";
import servings from "../serving/servings";

const METRIC_UNITS = [
  "milliliter",
  "liter",
  "gram",
  "kilogram",
]

function addIndexAsId(obj: object, i: number) { return _.set(obj, "id", i); }

function buildDocuments(list: { amount: string }[]) {
  const fullList = _.concat(
    _.map(list, ({ amount }) => { return { unitText: amount } }),
    _.map(METRIC_UNITS, unitText => { return { unitText } })
  );
  const miniSearch = new MiniSearch({
    fields: ['unitText']
  })

  miniSearch.addAll(_.map(fullList, addIndexAsId));
  return miniSearch;

}

const miniSearch = buildDocuments(_.concat(servings, portions));

function autoComplete(miniSearch: MiniSearch, partialUnit: string) {
  const options: SearchOptions = {
    fuzzy: true,
    combineWith: "AND",
  };
  return _.map(miniSearch.autoSuggest(partialUnit, options), "suggestion");
}

export default _.partial(autoComplete, miniSearch);