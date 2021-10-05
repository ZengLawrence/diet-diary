import _ from 'lodash';
import MiniSearch from 'minisearch';

function addIndexAsId(obj: object, i: number) { return _.set(obj, "id", i); }

export function buildDocuments<T extends object>(list: T[]) {
  const miniSearch = new MiniSearch({
    fields: ['foodName'],
    storeFields: ['foodName', 'servingSize', 'bestChoice']
  })

  const docs = _.map(list, addIndexAsId);
  miniSearch.addAll(docs);
  return miniSearch;
}

export function search<T>(
  docs: MiniSearch<T>,
  foodName: string
) {
  return docs.search(foodName, { fuzzy: true });
}