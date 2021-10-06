import _ from 'lodash';
import MiniSearch, { SearchResult } from 'minisearch';

function addIndexAsId(obj: object, i: number) { return _.set(obj, "id", i); }

export function buildDocuments<T extends object>(list: T[]) {
  const miniSearch = new MiniSearch({
    fields: ['foodName']
  })

  miniSearch.addAll(_.map(list, addIndexAsId));
  return { 
    miniSearch, 
    list, 
  }
}

function perform<T>(miniSearch: MiniSearch<T>, foodName: string) {
  const options = { fuzzy: true };
  return miniSearch.search(foodName, options);
}

export function search<T>(
  docs: { miniSearch: MiniSearch<T>, list: T[] },
  foodName: string
) {
  const { miniSearch, list } = docs;
  return _.map(perform(miniSearch, foodName), res => list[res.id]);
}