import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import { Amount, parseAmount } from '../parser/amount';
import convert, { Volume } from 'convert-units';

type Unit = Amount['unit'];

function isVolume(unit: Unit) {
  return _.includes(convert().possibilities('volume'), unit);
}

function harmonize(fromUnit: Unit, toUnit: Unit) {
  if (_.isUndefined(fromUnit) || _.isUndefined(toUnit)) {
    return { fromUnit, toUnit };
  }

  if (fromUnit === 'oz' && isVolume(toUnit)) {
    return { fromUnit: 'fl-oz' as Volume, toUnit };
  }

  if (toUnit === 'oz' && isVolume(fromUnit)) {
    return { fromUnit, toUnit: 'fl-oz' as Volume };
  }

  return { fromUnit, toUnit };
}

function take(unit: Unit) {
  return {
    makeConvertibleTo: _.partial(harmonize, unit),
  }
}

function servingFor(unitServing: Serving, servingAmount: Amount, amount: string) {
  const from = parseAmount(amount);
  const { fromUnit, toUnit } = take(from.unit).makeConvertibleTo(servingAmount.unit);
  try {
    const normalizedQuantity = (fromUnit && toUnit) ? convert(from.quantity).from(fromUnit).to(toUnit) : from.quantity;
    return multiply(unitServing, _.round(normalizedQuantity / servingAmount.quantity, 3));  
  } catch(e) {
    return undefined;
  }
}

export default function baseOn({ serving, amount }: { serving: Serving; amount: string }) {
  const servingAmount = parseAmount(amount);
  return {
    servingFor: _.partial(servingFor, serving, servingAmount)
  }
}