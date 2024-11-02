import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import parseAmount, { DecomposedAmount } from '../parser/DecomposedAmount';
import convert, { isMeasurementConvertible, Unit } from '../convert';

function measurementFor(unit: Unit, { measurement, alternateMeasurement }: DecomposedAmount, prepMethod?: string) {
  const isUnitConvertibleTo = _.partial(isMeasurementConvertible, unit);
  const allMeasurements = alternateMeasurement ? [measurement, alternateMeasurement] : [measurement];
  const canBeConverted = _.filter(allMeasurements, isUnitConvertibleTo);

  if (prepMethod) {
    const containsPrepMethod = (m: typeof measurement) => {
      const words = _.words(_.lowerCase(m.unitText));
      return _.includes(words, prepMethod);
    }
    const hasPrepMethod = _.filter(canBeConverted, containsPrepMethod);
    if (hasPrepMethod) {
      return _.defaultTo(_.head(hasPrepMethod), measurement);
    }
  }
  return _.defaultTo(_.head(canBeConverted), measurement);
}

function prepMethod(unitText: string | undefined) {
  const words = _.words(_.lowerCase(unitText));
  if (_.size(words) > 1) {
    return words[1];
  } else {
    return undefined;
  }
}

function servingFor(unitServing: Serving, servingAmount: DecomposedAmount, amount: string) {
  const from = parseAmount(amount).measurement;
  const to = measurementFor(from.unit, servingAmount, prepMethod(from.unitText));

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