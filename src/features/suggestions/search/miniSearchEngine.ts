import _ from 'lodash';
import MiniSearch from 'minisearch';

function addIndexAsId(obj: object, i: number) { return _.set(obj, "id", i); }

export function buildDocuments<T extends object>(list: T[]) {
  const miniSearch = new MiniSearch({
    fields: ['foodName']
  })

  miniSearch.addAll(_.map(list, addIndexAsId));
  return { miniSearch, list };
}

export function search<T>(
  docs: { miniSearch: MiniSearch<T>, list: T[] },
  foodName: string
) {
  const { miniSearch, list } = docs;
  const options = { fuzzy: true };
  return _.map(miniSearch.search(foodName, options), res => list[res.id]);
}