import _ from 'lodash';
import { PredefinedSuggestion } from './search';
import { isMeasure, measureOf, parseAmount, Unit } from '../parser/amount';

export default function (fromUnit: Unit, suggestion: PredefinedSuggestion) {
  if (_.isUndefined(fromUnit))
    return true;

  const isConvertibleTo = _.partial(isMeasure, _, measureOf(fromUnit));
  const toUnit = parseAmount(suggestion.amount).unit;
  return isConvertibleTo(toUnit);
}
