import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import { parseAmount } from '../parser/amount';
import convert from 'convert-units';

export default function calculateServing(unitServing: Serving, unitAmount: string, amount: string) {
  const to = parseAmount(amount);
  const unitQuantity = parseAmount(unitAmount);
  const toUnit = to.unit;
  const unit = unitQuantity.unit;
  const normalizedQuantity = (toUnit && unit) ? convert(to.quantity).from(toUnit).to(unit) : to.quantity;
  return multiply(unitServing, _.round(normalizedQuantity / unitQuantity.quantity, 3));
}

