import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import parseAmount, { Amount } from '../parser/amount';
import { isMeasurementConvertibleFunc } from '../search/isMeasurementConvertibleFunc';
import { convert, Unit } from '../Unit';

function measurementFor(unit: Unit | undefined, amount: Amount) {
  if (_.isUndefined(unit)) return amount.measurement;

  const isConvertible = isMeasurementConvertibleFunc(unit);
  if (isConvertible(amount.measurement)) {
    return amount.measurement;
  } else if (amount.alternateMeasurement && isConvertible(amount.alternateMeasurement)) {
    return amount.alternateMeasurement;
  }

  return undefined;
}

function servingFor(unitServing: Serving, servingAmount: Amount, amount: string) {
  const from = parseAmount(amount).measurement;
  const to = measurementFor(from.unit, servingAmount);
  if (_.isUndefined(to)) return undefined;  // this should not happen

  try {
    const normalizedQuantity = (from.unit && to.unit) ? convert(from.quantity).from(from.unit).to(to.unit) : from.quantity;
    return multiply(unitServing, _.round(normalizedQuantity / to.quantity, 3));  
  } catch(e) {
    return undefined;
  }
}

export default function baseOn(suggestion: { serving: Serving; amount: string }) {
  const { serving, amount } = suggestion;
  const servingAmount = parseAmount(amount);
  return {
    servingFor: _.partial(servingFor, serving, servingAmount)
  }
}