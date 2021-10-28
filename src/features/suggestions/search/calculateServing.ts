import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import { parseAmount } from '../parser/amount';
import convert, { Unit } from 'convert-units';

export default function calculateServing(unitServing: Serving, unitAmount: string, amount: string) {
  const to = parseAmount(amount);
  const unitQuantity = parseAmount(unitAmount);
  const toUnit = normalize(to.unit);
  const unit = normalize(unitQuantity.unit);
  const normalizedQuantity = (toUnit && unit) ? convert(to.quantity).from(toUnit).to(unit) : to.quantity;
  return multiply(unitServing, _.round(normalizedQuantity / unitQuantity.quantity, 3));
}

function normalize(unitStr: string): Unit | undefined {
  if (unitStr === 'lb' ||
    unitStr === 'oz') {
    return unitStr;
  } else {
    return undefined;
  }
}
