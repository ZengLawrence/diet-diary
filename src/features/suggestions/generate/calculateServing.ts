import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import parseAmount, { Amount } from '../parser/amount';
import { convert, isMeasurementConvertible, Unit } from '../Unit';

function measurementFor(unit: Unit | undefined, { measurement, alternateMeasurement }: Amount) {
  if (_.isUndefined(unit)) {
    if (alternateMeasurement && _.isUndefined(alternateMeasurement.unit)) {
      return alternateMeasurement;
    }
    return measurement
  };

  const isUnitConvertibleTo = _.partial(isMeasurementConvertible, unit);
  if (isUnitConvertibleTo(measurement)) {
    return measurement;
  } else if (alternateMeasurement && isUnitConvertibleTo(alternateMeasurement)) {
    return alternateMeasurement;
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