import convert from 'convert-units';
import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import parseAmount, { Amount } from '../parser/amount';

function servingFor(unitServing: Serving, servingAmount: Amount, amount: string) {
  const from = parseAmount(amount);
  const fromUnit = from.unit;
  const toUnit = servingAmount.unit;
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