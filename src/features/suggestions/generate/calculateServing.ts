import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import parseAmount, { DecomposedAmount } from '../parser/DecomposedAmount';
import convert, { isMeasurementConvertible, Unit } from '../convert';

function measurementFor(unit: Unit, { measurement, alternateMeasurement }: DecomposedAmount) {
  const isUnitConvertibleTo = _.partial(isMeasurementConvertible, unit);
  const allMeasurements = alternateMeasurement ? [measurement, alternateMeasurement] : [measurement];
  const canBeConverted = _.filter(allMeasurements, isUnitConvertibleTo);
  return _.defaultTo(_.head(canBeConverted), measurement);
}

function servingFor(unitServing: Serving, servingAmount: DecomposedAmount, amount: string) {
  const from = parseAmount(amount).measurement;
  const to = measurementFor(from.unit, servingAmount);

  try {
    const normalizedQuantity = convert(from.quantity, from.unit, to.unit);
    if (_.isNaN(normalizedQuantity)) return undefined;
    return multiply(unitServing, _.round(normalizedQuantity / to.quantity, 3));
  } catch {
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