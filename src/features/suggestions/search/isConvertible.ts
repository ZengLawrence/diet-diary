import _ from 'lodash';
import { PredefinedSuggestion } from './search';
import parseAmount from '../parser/amount';
import { isMeasure, measureOf, Unit } from "../../../model/Unit";

export default function isConvertible(fromUnit: Unit, suggestion: PredefinedSuggestion) {
  if (_.isUndefined(fromUnit))
    return true;

  const isConvertibleTo = _.partial(isMeasure, _, measureOf(fromUnit));
  const toUnit = parseAmount(suggestion.amount).unit;
  return isConvertibleTo(toUnit);
}
