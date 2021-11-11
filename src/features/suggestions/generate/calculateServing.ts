import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import parseAmount, { Amount } from '../parser/amount';
import convert, { isMeasurementConvertible, Unit } from '../convert';

function measurementFor(unit: Unit, { measurement, alternateMeasurement }: Amount) {
  if (unit === "unknown") {
    if (alternateMeasurement && alternateMeasurement.unit === "unknown") {
      return alternateMeasurement;
    }
    return measurement;
  };

  const isUnitConvertibleTo = _.partial(isMeasurementConvertible, unit);
  if (isUnitConvertibleTo(measurement)) {
    return measurement;
  } else if (alternateMeasurement && isUnitConvertibleTo(alternateMeasurement)) {
    return alternateMeasurement;
  }
  return measurement;
}

function servingFor(unitServing: Serving, servingAmount: Amount, amount: string) {
  const from = parseAmount(amount).measurement;
  const to = measurementFor(from.unit, servingAmount);

  try {
    const normalizedQuantity = convert(from.quantity, from.unit, to.unit);
    return multiply(unitServing, _.round(normalizedQuantity / to.quantity, 3));
  } catch (e) {
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