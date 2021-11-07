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
  const fromUnit = from.unit;
  const to = measurementFor(fromUnit, servingAmount);
  const toUnit = to?.unit;
  const toQuantity = to?.quantity;
  try {
    const normalizedQuantity = (fromUnit && toUnit) ? convert(from.quantity).from(fromUnit).to(toUnit) : from.quantity;
    if (_.isUndefined(toQuantity)) return undefined;
    return multiply(unitServing, _.round(normalizedQuantity / toQuantity, 3));  
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