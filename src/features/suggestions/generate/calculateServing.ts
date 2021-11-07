import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import parseAmount, { Amount } from '../parser/amount';
import { convert } from '../Unit';

function servingFor(unitServing: Serving, servingAmount: Amount, amount: string) {
  const from = parseAmount(amount);
  const fromUnit = from.measurement.unit;
  const toUnit = servingAmount.measurement.unit;
  try {
    const normalizedQuantity = (fromUnit && toUnit) ? convert(from.measurement.quantity).from(fromUnit).to(toUnit) : from.measurement.quantity;
    return multiply(unitServing, _.round(normalizedQuantity / servingAmount.measurement.quantity, 3));  
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